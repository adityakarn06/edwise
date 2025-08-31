"use client";

import { useState } from "react";

type DocumentViewProps = {
  pdfUrl: string;
  interactive?: boolean; // for mobile, set to false
};

export default function DocumentView({ pdfUrl, interactive = true }: DocumentViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = interactive
    ? `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`
    : `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;   //for mobile, show preview only

  return (
    <div className="h-full w-full relative overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 bg-black/80 animate-pulse" />}
      <iframe
        key={src}
        src={src}
        className={`w-full h-full transition-opacity duration-200 rounded-lg ${
          interactive ? "" : "pointer-events-none"
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
        title="PDF Document"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
    </div>
  );
}