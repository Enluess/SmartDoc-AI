from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .doc_parser import extract_text_from_pdf, extract_text_from_docx, extract_text_from_txt
from .summarizer import summarize_document
from .models import SummaryResponse

app = FastAPI(
    title="SmartDoc AI Backend",
    description="Yapay zekâ destekli profesyonel doküman özetleyici API"
)

# CORS (Next.js ile local geliştirmede portlar farklıysa)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Prod'da kısıtla!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize", response_model=SummaryResponse)
async def summarize(file: UploadFile = File(...)):
    try:
        file_bytes = await file.read()
        if file.content_type == "application/pdf":
            text = extract_text_from_pdf(file_bytes)
        elif file.content_type in ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"]:
            text = extract_text_from_docx(file_bytes)
        elif file.content_type == "text/plain":
            text = extract_text_from_txt(file_bytes)
        else:
            raise HTTPException(status_code=400, detail="Desteklenmeyen dosya türü")
        if not text or len(text) < 30:
            raise HTTPException(status_code=400, detail="Belge metni boş veya çok kısa")
        summary = await summarize_document(text)
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))