// --- PDFPreview.tsx ---
import React from 'react';

const PDFPreview = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Final SWMS PDF</h2>
      <p className="mb-2">Your SWMS has been successfully generated.</p>
      <p className="mb-4">This PDF is vector-based, includes watermarks, and is locked to prevent editing.</p>
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-4 py-2">Download PDF</button>
        <button className="bg-gray-500 text-white px-4 py-2">Email to Myself</button>
      </div>
    </div>
  );
};

export default PDFPreview;