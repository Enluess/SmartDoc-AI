# SmartDoc AI

**SmartDoc AI**, uzun metinleri veya belgeleri başlık başlık profesyonelce özetleyen, Türkçe dil desteğiyle çalışan bir yapay zeka uygulamasıdır.  
Bu proje, API tabanlı LLM (Large Language Model) servisleri ile entegre çalışır (örn. OpenRouter, Gemini, OpenAI, Hugging Face gibi), özetleri standart başlıklarla ve anlaşılır şekilde sunar.

## 🚀 Özellikler

- **Başlık başlık ve şablonlu çıktı:**  
  - Belgenin Konusu
  - Tarih / Geçerlilik
  - Taraflar
  - Ana Maddeler
  - Riskler / Uyarılar
  - Terimler
  - Genel Değerlendirme

- **Türkçe metinlere tam destek**
- **Kolay entegrasyon:** İstenilen LLM API anahtarı ile çalıştırılabilir (OpenRouter, Gemini, OpenAI, vb.)
- **Modüler backend (FastAPI) & frontend desteği**
- **Uzun metinlerde yüksek doğruluk ve hızlı çıktı**

---

## 🛠️ Kurulum

### 1. Klonla

```bash
git clone https://github.com/Enluess/smartdoc-ai.git
cd smartdoc-ai
```

### 2. Ortam değişkenlerini ayarla

Kullandığınız LLM servisine göre ilgili API anahtarını `.env` veya ortam değişkeni olarak girin:

```bash
export OPENROUTER_API_KEY=senin_openrouter_api_keyin
# veya
export GEMINI_API_KEY=senin_gemini_api_keyin
```

### 3. Gereksinimleri kur

```bash
cd backend/app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Sunucuyu başlat

```bash
uvicorn main:app --reload
```

---

## ⚙️ Proje Yapısı

```
backend/
  app/
    main.py           # FastAPI sunucu dosyası
    summarizer.py     # LLM API entegrasyonu ve özetleme promptları
    models.py         # Pydantic şema ve çıktı modelleri
    ...
frontend/
  ...                # (Opsiyonel) Frontend arayüz dosyaları
README.md
```

---

## 📦 API Özeti

### /summarize (POST)

**Açıklama:**  
Girilen metni başlık başlık özetler.

**Parametre:**  
`text` (string): Özetlenecek metin

**Dönen:**  
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

## 🧠 Kullanılan Teknolojiler

- Python 3.x & FastAPI
- httpx (API istekleri için)
- OpenRouter, Gemini, OpenAI veya Hugging Face API (LLM servisleri)
- (İsteğe bağlı) Frontend: React, Vue, Next.js vb.

---

## 🔑 LLM Servisi Değiştirmek

- Sadece `summarizer.py` dosyasında ilgili API entegrasyonunu değiştirerek farklı bir modeli kullanabilirsin.
- Prompt şablonunu istediğin gibi güncelleyebilirsin.

---

## 🎯 Katkı ve Lisans

Bu proje öğrenim ve geliştirme amaçlıdır.  
PR ve katkılara açıktır!

---

## ✉️ İletişim

Her türlü öneri, hata bildirimi veya işbirliği için:  
[Instagram](https://instagram.com/watashienesu)
