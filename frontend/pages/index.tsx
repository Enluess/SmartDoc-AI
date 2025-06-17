import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import SummaryResult, { SummaryData } from "../components/SummaryResult";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setSummary(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${BACKEND_URL}/summarize`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      setSummary(data);
      setRawResponse(data.raw_response || null);
    } catch (err: any) {
      setError(err.message || "Beklenmeyen bir hata oluştu.");
    }
    setLoading(false);
  };

  const handleDownload = (type: "txt" | "json") => {
    if (!summary) return;
    if (type === "txt") {
      const txt =
        `Belgenin Konusu: ${summary.topic}\n` +
        `Tarih / Geçerlilik: ${summary.date || ""}\n` +
        `Taraflar: ${summary.parties || ""}\n` +
        `Ana Maddeler: ${summary.main_points}\n` +
        `Riskler / Uyarılar: ${summary.risks || ""}\n` +
        `Terimler: ${summary.terms || ""}\n` +
        `Genel Değerlendirme: ${summary.evaluation}\n`;
      downloadFile(txt, "ozet.txt", "text/plain");
    } else {
      downloadFile(JSON.stringify(summary, null, 2), "ozet.json", "application/json");
    }
  };

  const downloadFile = (data: string, filename: string, mime: string) => {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex flex-col items-center pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">SmartDoc AI</h1>
      <p className="mb-6 text-gray-700 max-w-xl text-center">
        PDF, DOCX ya da TXT dokümanlarınızı yükleyin. Akıllı özetleyici, belgenizi başlık başlık analiz etsin.
      </p>
      <div className="w-full max-w-xl">
        <FileUpload onUpload={handleUpload} loading={loading} />
        {loading && (
          <div className="text-blue-600 mt-4 text-center">Yükleniyor & özetleniyor, lütfen bekleyin...</div>
        )}
        {error && (
          <div className="text-red-500 mt-4 text-center whitespace-pre-line">{error}</div>
        )}
        {summary && (
          <SummaryResult data={summary} onDownload={handleDownload} />
        )}
      </div>
      <footer className="mt-auto p-4 text-xs text-gray-400">© 2025 SmartDoc AI</footer>
    </main>
  );
}