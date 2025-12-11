import React from "react";
import ExportJSON from "./options/ExportJSON";
import ExportPDF from "./options/ExportPDF";

export default function MoreModal({ onClose, formData, customFields, fields }) {
  return (
    <div
      className="fixed z-1001 left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-[90%] max-w-[320px] border border-[#e2e8f0]">
        <div className="text-[14px] font-semibold text-[#0f172a] mb-4">
          more options
        </div>

        <div className="flex flex-col gap-2">
          <ExportJSON
            formData={formData}
            customFields={customFields}
            fields={fields}
          />

          <ExportPDF
            formData={formData}
            customFields={customFields}
            fields={fields}
          />

          <button
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-lg border-none text-[12px] font-medium cursor-pointer transition-all duration-200 bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] mt-2"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
