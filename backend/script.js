console.log("JavaScript connected");

const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "prathvi-theme";

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    return null;
  }
}

function writeStoredTheme(value) {
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch (error) {
    return;
  }
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
}

applyTheme(readStoredTheme() === "dark");

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);
  writeStoredTheme(isDark ? "dark" : "light");
});

const fadeSections = document.querySelectorAll(".fade-in");

function revealSection(section) {
  section.classList.remove("is-pending");
  section.classList.add("visible");
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeSections.forEach(function (section) {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      revealSection(section);
    } else {
      section.classList.add("is-pending");
      observer.observe(section);
    }
  });
} else {
  fadeSections.forEach(revealSection);
}

const profileImage = document.getElementById("profileImage");
if (profileImage) {
  function showProfileImage() {
    if (profileImage.naturalWidth > 0) {
      profileImage.classList.add("is-loaded");
    }
  }
  profileImage.addEventListener("load", showProfileImage);
  profileImage.addEventListener("error", function () {
    profileImage.classList.remove("is-loaded");
  });
  if (profileImage.complete) {
    showProfileImage();
  }
}

const siteNav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll("#navLinks a");
const navSections = ["about", "education", "skills", "projects", "contact"].map(function (id) {
  return document.getElementById(id);
});

navToggle.addEventListener("click", function () {
  const open = !siteNav.classList.contains("is-open");
  siteNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function updateActiveNav() {
  const marker = 110;
  let currentId = "about";
  navSections.forEach(function (section) {
    if (!section) {
      return;
    }
    if (section.getBoundingClientRect().top - marker <= 0) {
      currentId = section.id;
    }
  });
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === "#" + currentId);
  });
}

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
  backToTop.classList.toggle("is-visible", window.scrollY > 400);
}

window.addEventListener("scroll", function () {
  updateActiveNav();
  updateBackToTop();
});

updateActiveNav();
updateBackToTop();

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const projectSearch = document.getElementById("projectSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll("#projects .project-card");
const noProjects = document.getElementById("noProjects");
let activeFilter = "all";

function cardMatches(card) {
  const query = projectSearch.value.toLowerCase().trim();
  const name = (card.getAttribute("data-name") || "").toLowerCase();
  const tags = (card.getAttribute("data-tags") || "").toLowerCase();
  const tagList = tags ? tags.split(/\s+/).filter(Boolean) : [];
  const searchMatch = !query || name.indexOf(query) !== -1 || tags.indexOf(query) !== -1;
  const filterMatch = activeFilter === "all" || tagList.indexOf(activeFilter) !== -1;
  return searchMatch && filterMatch;
}

function filterProjects() {
  let visibleCount = 0;
  projectCards.forEach(function (card) {
    const show = cardMatches(card);
    card.classList.toggle("is-hidden", !show);
    if (show) {
      visibleCount += 1;
    }
  });
  if (visibleCount === 0) {
    noProjects.hidden = false;
  } else {
    noProjects.hidden = true;
  }
}

projectSearch.addEventListener("input", filterProjects);

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeFilter = button.getAttribute("data-filter") || "all";
    filterButtons.forEach(function (item) {
      item.classList.toggle("is-active", item === button);
    });
    filterProjects();
  });
});

const knowledge = {
  name: "Prathvi Singh",
  tagline: "Aspiring AI Engineer",
  about:
    "I want to become an AI engineer and enjoy exploring how modern AI systems are built. I have a strong Computer Science core and a solid understanding of large language models. I like building practical projects and using Git and GitHub to manage my work.",
  skills: [
    "Computer Science Core",
    "LLMs (deep understanding)",
    "RAG (Retrieval-Augmented Generation)",
    "Databases and Vector Databases",
    "SQLite",
    "FastAPI",
    "Streamlit",
    "Git and GitHub"
  ],
  projects: [
    {
      name: "Python Programs Collection",
      description: "Factorial, Fibonacci and structure-to-dictionary conversion programs with an updated README.",
      github: "https://github.com/Prathvi01singh/Python-program-collection"
    },
    {
      name: "Messy Python Code Improvement",
      description: "A messy Python script improved using AI assistance.",
      github: "https://github.com/Prathvi01singh/Messy-Python-code-Improvement"
    },
    {
      name: "Bug Fixing Using Cursor AI",
      description: "A buggy program identified and corrected using Cursor AI.",
      github: "https://github.com/Prathvi01singh/Bug-Fixing-Cursor-AI"
    },
    {
      name: "Interactive Quiz Application",
      description: "The quiz application built in Lecture 10.",
      github: "https://github.com/Prathvi01singh/Interactive-Quiz-Application"
    },
    {
      name: "Book Reading List Application",
      description: "The reading list application built in Lecture 11.",
      github: "https://github.com/Prathvi01singh/Book-Reading-List-Application"
    },
    {
      name: "To-Do App",
      description: "A simple task manager to add, view and complete tasks.",
      github: "https://github.com/Prathvi01singh/To-Do-App-Project"
    },
    {
      name: "Weather API App",
      description: "An app that fetches and displays weather data from a weather API.",
      github: "https://github.com/Prathvi01singh/Weather-app"
    }
  ],
  github: "https://github.com/Prathvi01singh",
  linkedin: "https://www.linkedin.com/in/prathvi-singh-731951389",
  email: "prathvisingh1257@gmail.com",
  phone: "+91 9411628355"
};

const fallbackReply =
  "I can only answer questions about Prathvi's skills, projects and contact details. Try one of the buttons below.";

const greetingReply =
  "Hello. I am Prathvi's Assistant. I answer questions about " +
  knowledge.name +
  ", an " +
  knowledge.tagline +
  ", using only the details already on this page.";

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatChips = document.querySelectorAll(".chat-chip");

let botIsTyping = false;

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = sender === "user" ? "chat-row chat-row-user" : "chat-row chat-row-bot";

  const bubble = document.createElement("p");
  bubble.className = sender === "user" ? "chat-bubble chat-bubble-user" : "chat-bubble chat-bubble-bot";
  bubble.textContent = text;

  row.appendChild(bubble);
  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function projectSummary(project) {
  return project.name + ": " + project.description + " GitHub: " + project.github + ".";
}

function getBotReply(rawMessage) {
  const message = rawMessage.toLowerCase().trim();

  if (/\b(hello|hi|hey|good morning|good evening|greetings)\b/.test(message)) {
    return greetingReply;
  }

  if (/who are you|what are you|your name|assistant/.test(message)) {
    return (
      "I am Ask Prathvi's Assistant, a chatbot on this page. I can share " +
      knowledge.name +
      "'s tagline, about text, skills, projects and contact details. I do not invent extra facts."
    );
  }

  if (/linkedin/.test(message)) {
    return knowledge.name + "'s LinkedIn profile is " + knowledge.linkedin + ".";
  }

  if (/phone|mobile|call/.test(message)) {
    return knowledge.name + "'s phone number is " + knowledge.phone + ".";
  }

  if (/github|git hub/.test(message) && !/to-?do|weather|quiz|book|python|messy|bug/.test(message)) {
    return knowledge.name + "'s GitHub profile is " + knowledge.github + ".";
  }

  if (/email|mailto|mail/.test(message)) {
    return knowledge.name + "'s email is " + knowledge.email + ".";
  }

  if (/contact/.test(message)) {
    return (
      "Contact " +
      knowledge.name +
      " on GitHub at " +
      knowledge.github +
      ", LinkedIn at " +
      knowledge.linkedin +
      ", by email at " +
      knowledge.email +
      ", or by phone at " +
      knowledge.phone +
      "."
    );
  }

  if (/college|university|degree|course|education|year|semester|jecrc/.test(message)) {
    return (
      "Prathvi Singh is studying B.Tech (CSE core) at JECRC University, in the 2nd year, 3rd semester."
    );
  }

  if (/\brag\b|retrieval-augmented|retrieval augmented/.test(message)) {
    return knowledge.name + " lists RAG (Retrieval-Augmented Generation) as a skill on this page.";
  }

  if (/\bllms?\b|large language model/.test(message)) {
    return (
      knowledge.name +
      " lists LLMs (deep understanding) as a skill. The About section also says he has a solid understanding of large language models."
    );
  }

  if (/fastapi/.test(message)) {
    return knowledge.name + " lists FastAPI as a skill on this page.";
  }

  if (/streamlit/.test(message)) {
    return knowledge.name + " lists Streamlit as a skill on this page.";
  }

  if (/sqlite/.test(message)) {
    return knowledge.name + " lists SQLite as a skill on this page.";
  }

  if (/vector database|databases/.test(message)) {
    return knowledge.name + " lists Databases and Vector Databases as a skill on this page.";
  }

  if (/computer science|\bcs\b/.test(message)) {
    return knowledge.name + " lists Computer Science Core as a skill on this page.";
  }

  if (/skills?|what can you do/.test(message)) {
    return knowledge.name + "'s skills on this page are: " + knowledge.skills.join(", ") + ".";
  }

  if (/python program|factorial|fibonacci|structure-to-dictionary/.test(message)) {
    return projectSummary(knowledge.projects[0]);
  }

  if (/messy/.test(message)) {
    return projectSummary(knowledge.projects[1]);
  }

  if (/bug fixing|cursor ai/.test(message)) {
    return projectSummary(knowledge.projects[2]);
  }

  if (/quiz/.test(message)) {
    return (
      projectSummary(knowledge.projects[3]) +
      " It is a multiple-choice quiz with five questions, instant answer checking and a final score, built with HTML, CSS and JavaScript in Lecture 10."
    );
  }

  if (/book|reading list/.test(message)) {
    return projectSummary(knowledge.projects[4]) + " It is a reading list application developed in Lecture 11.";
  }

  if (/to-?do|task manager/.test(message)) {
    return projectSummary(knowledge.projects[5]);
  }

  if (/weather/.test(message)) {
    return projectSummary(knowledge.projects[6]);
  }

  if (/projects?/.test(message)) {
    return (
      knowledge.name +
      " has seven projects on this page. " +
      knowledge.projects
        .map(function (project) {
          return project.name + " (" + project.github + ")";
        })
        .join("; ") +
      "."
    );
  }

  if (/about|tagline|who is prathvi|your background|aspiring/.test(message)) {
    return knowledge.name + " is an " + knowledge.tagline + ". " + knowledge.about;
  }

  if (/\bgit\b/.test(message)) {
    return knowledge.name + " lists Git and GitHub as a skill. The GitHub profile is " + knowledge.github + ".";
  }

  return fallbackReply;
}

const CHAT_URL = "http://127.0.0.1:8000/chat";
const MAX_CLIENT_MESSAGE_LENGTH = 500;

function showFallbackNotice() {
  if (document.getElementById("chatOfflineNotice")) {
    return;
  }

  const notice = document.createElement("p");
  notice.id = "chatOfflineNotice";
  notice.className = "chat-notice";
  notice.textContent =
    "Using on-page answers because the local chat server is not running.";
  chatForm.parentNode.insertBefore(notice, chatForm);
}

function hideFallbackNotice() {
  const notice = document.getElementById("chatOfflineNotice");
  if (notice) {
    notice.remove();
  }
}

async function getAssistantReply(text) {
  if (text.length > MAX_CLIENT_MESSAGE_LENGTH) {
    return "Please keep your message under 500 characters.";
  }

  try {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      throw new Error("Chat request failed");
    }

    const data = await response.json();
    if (!data || typeof data.reply !== "string" || !data.reply.trim()) {
      throw new Error("Invalid chat response");
    }

    hideFallbackNotice();
    return data.reply.trim();
  } catch (error) {
    showFallbackNotice();
    return getBotReply(text);
  }
}

function replyToUser(text) {
  if (botIsTyping) {
    return;
  }

  botIsTyping = true;
  const typingBubble = addMessage("typing...", "bot");
  typingBubble.classList.add("chat-typing");

  getAssistantReply(text)
    .then(function (reply) {
      typingBubble.classList.remove("chat-typing");
      typingBubble.textContent = reply;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .finally(function () {
      botIsTyping = false;
    });
}

function openChat() {
  chatWindow.classList.add("is-open");
  chatWindow.setAttribute("aria-hidden", "false");
  chatToggle.setAttribute("aria-expanded", "true");
  chatToggle.setAttribute("aria-label", "Close Ask Prathvi's Assistant");
  addMessage(greetingReply, "bot");
  chatInput.focus();
}

function closeChat() {
  chatWindow.classList.remove("is-open");
  chatWindow.setAttribute("aria-hidden", "true");
  chatToggle.setAttribute("aria-expanded", "false");
  chatToggle.setAttribute("aria-label", "Open Ask Prathvi's Assistant");
}

chatToggle.addEventListener("click", function () {
  if (chatWindow.classList.contains("is-open")) {
    closeChat();
  } else {
    openChat();
  }
});

chatClose.addEventListener("click", closeChat);

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text || botIsTyping) {
    return;
  }
  addMessage(text, "user");
  chatInput.value = "";
  replyToUser(text);
});

chatChips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    if (botIsTyping) {
      return;
    }
    const text = chip.getAttribute("data-reply");
    addMessage(text, "user");
    replyToUser(text);
  });
});
