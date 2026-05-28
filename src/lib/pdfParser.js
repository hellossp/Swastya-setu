import pdfParse from "pdf-parse/lib/pdf-parse.js";

/**
 * Parses PDF Buffer and extracts text. Runs server-side.
 * @param {Buffer} buffer 
 * @returns {Promise<string>}
 */
export async function parsePDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF Parse error in library:", error);
    throw error;
  }
}
