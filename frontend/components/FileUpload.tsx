import React, { useRef, useState } from "react";

interface FileUploadProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload, loading }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{ minHeight: 200 }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={handleChange}
        disabled={loading}
      />
      <span className="text-2xl mb-2">📄</span>
      <span className="font-medium text-gray-700">
        Dosyanızı buraya sürükleyin veya tıklayın
      </span>
      <span className="text-sm text-gray-400 mt-1">
        (PDF, DOCX, TXT)
      </span>
    </div>
  );
};

export default FileUpload;