# Prathvi Singh Portfolio

A personal profile webpage for Prathvi Singh, an aspiring AI engineer. It includes About, Education, Skills, a filterable project grid with detail sections, and Contact, plus a chat widget.

## Technologies

- HTML
- CSS
- JavaScript
- FastAPI (optional local chat backend)
- Groq LLM through the OpenAI-compatible Python client (optional)

## Features

- Sticky navigation with About, Education, Skills, Projects and Contact
- Smooth scrolling, a gold highlight on the section in view, and a collapsed mobile menu
- Project search and filter (All, Python, JavaScript, Quiz, Book)
- Project detail sections for the first five projects
- Dark mode with localStorage memory
- Chat widget (LLM backend when running, keyword answers as fallback)
- Back to top button
- Fade-in on scroll, with content visible if JavaScript fails

## Setup instructions

Open `index.html` in a browser to view the site.

Optional chatbot backend on a Mac:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Add your Groq API key in `.env`, then run:

```bash
uvicorn main:app --reload
```

The chat endpoint is `http://127.0.0.1:8000/chat`. If the backend is not running, the chat widget still answers from the facts on the page.
