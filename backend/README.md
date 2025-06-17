# SmartDoc AI - Backend

## Kurulum

```bash
cd backend/app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Çalıştırma

```bash
export OPENROUTER_API_KEY=sk-or-v1-...
export SMARTDOC_DUMMY=true  # Dummy veriyle test için
uvicorn app.main:app --reload
```