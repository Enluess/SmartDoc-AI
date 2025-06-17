---

# SmartDoc AI

**SmartDoc AI** is an AI-powered application that professionally summarizes long texts or documents section by section, with full support for Turkish language.
This project integrates with API-based LLM (Large Language Model) services (e.g., OpenRouter, Gemini, OpenAI, Hugging Face) and delivers summaries with standardized headings and clear formatting.

## 🚀 Features

* **Section-by-section templated output:**

  * Document Topic
  * Date / Validity
  * Parties Involved
  * Main Points
  * Risks / Warnings
  * Terms
  * Overall Evaluation

* **Full support for Turkish texts**

* **Easy integration:** Works with any LLM API key (OpenRouter, Gemini, OpenAI, etc.)

* **Modular backend (FastAPI) & optional frontend support**

* **High accuracy and fast output for long texts**

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Enluess/smartdoc-ai.git
cd smartdoc-ai
```

### 2. Set environment variables

Enter your API key for the LLM service you use, via `.env` or environment variables:

```bash
export OPENROUTER_API_KEY=your_openrouter_api_key
# or
export GEMINI_API_KEY=your_gemini_api_key
```

### 3. Install dependencies

```bash
cd backend/app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Start the server

```bash
uvicorn main:app --reload
```

---

## ⚙️ Project Structure

```
backend/
  app/
    main.py           # FastAPI server entrypoint
    summarizer.py     # LLM API integration and summarization prompts
    models.py         # Pydantic schemas and output models
    ...
frontend/
  ...                # (Optional) Frontend files
README.md
```

---

## 📦 API Summary

### /summarize (POST)

**Description:**
Summarizes the provided text section by section.

**Parameter:**
`text` (string): The text to summarize

**Response:**

```json
{
  "topic": "...",
  "date": "...",
  "parties": "...",
  "main_points": "...",
  "risks": "...",
  "terms": "...",
  "evaluation": "...",
  "raw_response": {...}
}
```

---

## 🧠 Technologies Used

* Python 3.x & FastAPI
* httpx (for API requests)
* OpenRouter, Gemini, OpenAI or Hugging Face APIs (LLM services)
* (Optional) Frontend: React, Vue, Next.js, etc.

---

## 🔑 Switching LLM Service

* Simply update the API integration in `summarizer.py` to switch models.
* You can customize the prompt template as needed.

---

## 🎯 Contribution & License

This project is for learning and development purposes.
Pull requests and contributions are welcome!

---

## ✉️ Contact

For suggestions, bug reports, or collaboration:
[Instagram](https://instagram.com/watashienesu)

---
