"use client";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), { ssr: false });

export default function DocumentView({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="h-full w-full">
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  );
}