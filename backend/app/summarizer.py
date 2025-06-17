import os
import httpx

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def build_prompt(document_text: str) -> str:
    return (
        "Aşağıdaki metni başlık başlık özetle.\n"
        "Her başlık için varsa kısa ve net, yoksa 'Belirtilmemiş' yaz.\n"
        "Çıktı sadece aşağıdaki başlıklara göre, örnekteki formatla ve Türkçe olarak olsun:\n"
        "Belgenin Konusu: ...\n"
        "Tarih / Geçerlilik: ...\n"
        "Taraflar: ...\n"
        "Ana Maddeler:\n- ...\n- ...\n"
        "Riskler / Uyarılar: ...\n"
        "Terimler: ...\n"
        "Genel Değerlendirme: ...\n"
        "Yanıtta sadece bu başlıkları sırayla ve açıklamaları ile ver. Ek bilgi veya açıklama E-K-L-E-M-E.\n"
        "Metin:\n"
        f"{document_text.strip()[:15000]}"
    )

async def summarize_document(text: str) -> dict:
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.com/"  # Kendi siteniz varsa yazın, yoksa bırakın
    }
    prompt = build_prompt(text)
    payload = {
        "model": "mistralai/mistral-large",  # Değiştirebilirsin: openrouter/auto, meta-llama/3-70b-instruct, google/gemini-pro, vs.
        "messages": [
            {"role": "system", "content": "Profesyonel Türkçe doküman özetleyicisin. Kullanıcıya sadece istediği başlıkları ve formatı ilet."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2,
        "max_tokens": 2048
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload, timeout=90)
    if response.status_code != 200:
        raise Exception(f"OpenRouter API error: {response.text}")
    data = response.json()
    answer = data["choices"][0]["message"]["content"]
    # Başlıklara göre ayrıştırma
    def extract(section, text):
        import re
        m = re.search(rf"{section}:(.*?)(?=\n[A-ZÇĞİÖŞÜ/ ]{{3,}}:|\Z)", text, re.DOTALL)
        return m.group(1).strip() if m else ""
    return {
        "topic": extract("Belgenin Konusu", answer),
        "date": extract("Tarih / Geçerlilik", answer),
        "parties": extract("Taraflar", answer),
        "main_points": extract("Ana Maddeler", answer),
        "risks": extract("Riskler / Uyarılar", answer),
        "terms": extract("Terimler", answer),
        "evaluation": extract("Genel Değerlendirme", answer),
        "raw_response": data
    }