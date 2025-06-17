import React from "react";

export interface SummaryData {
  topic: string;
  date?: string;
  parties?: string;
  main_points: string;
  risks?: string;
  terms?: string;
  evaluation: string;
}

interface Props {
  data: SummaryData;
  onDownload?: (type: "txt" | "json") => void;
}

const SummaryResult: React.FC<Props> = ({ data, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Doküman Özeti</h2>
      <div className="space-y-2">
        <Field label="Belgenin Konusu" value={data.topic} />
        <Field label="Tarih / Geçerlilik" value={data.date} />
        <Field label="Taraflar" value={data.parties} />
        <Field label="Ana Maddeler" value={data.main_points} />
        <Field label="Riskler / Uyarılar" value={data.risks} />
        <Field label="Terimler" value={data.terms} />
        <Field label="Genel Değerlendirme" value={data.evaluation} />
      </div>
      {onDownload && (
        <div className="flex gap-3 mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onDownload("txt")}
          >
            .txt indir
          </button>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            onClick={() => onDownload("json")}
          >
            .json indir
          </button>
        </div>
      )}
    </div>
  );
};

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <span className="font-semibold text-gray-700">{label}: </span>
      <span className="text-gray-900 whitespace-pre-line">{value}</span>
    </div>
  );
}

export default SummaryResult;