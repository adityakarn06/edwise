"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
  const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    pdfUrl
  )}`;

  const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          CurrentPageInput,
          CurrentScale,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#292929",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ padding: "0 4px" }}>
              <ZoomOut />
            </div>
            <div style={{ padding: "0 4px" }}>
              <CurrentScale />
            </div>
            <div style={{ padding: "0 4px" }}>
              <ZoomIn />
            </div>

            <div
              style={{
                height: "1.5rem",
                borderLeft: "1px solid #555",
                margin: "0 8px",
              }}
            />

            <div style={{ padding: "0 4px" }}>
              <GoToPreviousPage />
            </div>
            <div
              style={{
                padding: "0 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CurrentPageInput /> / <NumberOfPages />
            </div>
            <div style={{ padding: "0 4px" }}>
              <GoToNextPage />
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar,
  });

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <Viewer
          fileUrl={proxiedUrl}
          plugins={[defaultLayoutPluginInstance]}
          theme="dark"
        />
      </div>
    </Worker>
  );
}