import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel, Field

load_dotenv()

MAX_MESSAGE_LENGTH = 500

SYSTEM_PROMPT = """You are the assistant on Prathvi Singh's portfolio. Answer only using the facts provided below. If asked something not covered, say you don't know. Never invent facts.

Name: Prathvi Singh
Tagline: Aspiring AI Engineer
About: I want to become an AI engineer and enjoy exploring how modern AI systems are built. I have a strong Computer Science core and a solid understanding of large language models. I like building practical projects and using Git and GitHub to manage my work.
Education: Prathvi Singh is studying B.Tech (CSE core) at JECRC University, in the 2nd year, 3rd semester. Focus: AI engineering and Computer Science core.
Skills:
- Computer Science Core
- LLMs (deep understanding)
- RAG (Retrieval-Augmented Generation)
- Databases and Vector Databases
- SQLite
- FastAPI
- Streamlit
- Git and GitHub
Projects:
- Python Programs Collection: Factorial, Fibonacci and structure-to-dictionary conversion programs with an updated README. GitHub: https://github.com/Prathvi01singh/Python-program-collection
- Messy Python Code Improvement: A messy Python script improved using AI assistance. GitHub: https://github.com/Prathvi01singh/Messy-Python-code-Improvement
- Bug Fixing Using Cursor AI: A buggy program identified and corrected using Cursor AI. GitHub: https://github.com/Prathvi01singh/Bug-Fixing-Cursor-AI
- Interactive Quiz Application: The quiz application built in Lecture 10. A multiple-choice quiz with five questions, instant answer checking and a final score, built with HTML, CSS and JavaScript. GitHub: https://github.com/Prathvi01singh/Interactive-Quiz-Application
- Book Reading List Application: The reading list application built in Lecture 11. A reading list application developed in Lecture 11. GitHub: https://github.com/Prathvi01singh/Book-Reading-List-Application
- To-Do App: A simple task manager to add, view and complete tasks. GitHub: https://github.com/Prathvi01singh/To-Do-App-Project
- Weather API App: An app that fetches and displays weather data from a weather API. GitHub: https://github.com/Prathvi01singh/Weather-app
GitHub: https://github.com/Prathvi01singh
LinkedIn: https://www.linkedin.com/in/prathvi-singh-731951389
Email: prathvisingh1257@gmail.com
Phone: +91 9411628355
"""

app = FastAPI(title="Prathvi Singh Portfolio Chat")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=MAX_MESSAGE_LENGTH)


class ChatResponse(BaseModel):
    reply: str


def get_groq_client() -> OpenAI:
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not api_key or "PLACEHOLDER" in api_key:
        raise HTTPException(
            status_code=500,
            detail="The Groq API key is missing. Add it to backend/.env.",
        )
    return OpenAI(
        api_key=api_key,
        base_url="https://api.groq.com/openai/v1",
    )


@app.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    if len(message) > MAX_MESSAGE_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Message must be {MAX_MESSAGE_LENGTH} characters or fewer.",
        )

    client = get_groq_client()
    model = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant").strip() or "llama-3.1-8b-instant"

    try:
        completion = client.chat.completions.create(
            model=model,
            temperature=0.2,
            max_tokens=300,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message},
            ],
        )
        reply = (completion.choices[0].message.content or "").strip()
        if not reply:
            raise HTTPException(
                status_code=502,
                detail="The assistant returned an empty reply.",
            )
        return ChatResponse(reply=reply)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="The assistant could not get a reply. Please try again.",
        )
