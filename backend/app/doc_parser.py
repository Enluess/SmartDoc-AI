import fitz  # PyMuPDF
import docx
import tempfile

def extract_text_from_pdf(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".pdf") as tmp:
        tmp.write(file_bytes)
        tmp.flush()
        doc = fitz.open(tmp.name)
        text = ""
        for page in doc:
            text += page.get_text("text") + "\n"
        return text.strip()

def extract_text_from_docx(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".docx") as tmp:
        tmp.write(file_bytes)
        tmp.flush()
        doc = docx.Document(tmp.name)
        text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
        return text.strip()

def extract_text_from_txt(file_bytes: bytes) -> str:
    return file_bytes.decode("utf-8", errors="ignore")