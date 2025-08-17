"use client";

export default function DocumentView({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="h-full w-full">
      <iframe
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        className="w-full h-full"
        title="PDF Document"
        loading="lazy"
      ></iframe>
    </div>
  );
}