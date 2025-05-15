// Install first: npm install jspdf
"use client"
import { useEffect } from 'react';
import jsPDF from 'jspdf';

const PDFGenerator = () => {
  useEffect(() => {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('example.pdf');
  }, []);

  return <div>PDF is being generated...</div>;
};

export default PDFGenerator;