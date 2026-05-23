import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ResumePreview = ({ file }) => {

  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="mt-10 bg-slate-900 border border-gray-800 rounded-3xl p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Resume Preview
      </h2>

      <div className="overflow-auto max-h-[800px]">

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(
            new Array(numPages),
            (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={650}
              />
            )
          )}
        </Document>

      </div>

    </div>
  );
};

export default ResumePreview;