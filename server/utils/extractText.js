import fs from 'fs';
const pdfParse = (await import('pdf-parse')).default;
import axios from 'axios';
import mammoth from 'mammoth';

export const extractTextFromFile = async (filePath) => {
    if (filePath.endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } else if (filePath.endsWith('.docx')) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    } else {
        throw new Error("Unsupported file format. Use PDF or DOCX.");
    }
};

export const extractTextFromURL = async (url) => {
    const res = await axios.get(url);
    // For Google Docs links, you need export to plain text or PDF
    return res.data; // crude version; better: convert Google Doc to PDF first
};
