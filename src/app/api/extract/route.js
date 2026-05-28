import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { analyzeReport } from "@/lib/analyzer.js";

export async function POST(req) {

  try {

    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return Response.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const data = await pdfParse(buffer);

   const analysis = analyzeReport(data.text);

return Response.json({
  success: true,
  text: data.text,
  analysis,
});

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      message: "PDF extraction failed",
      error: error.message,
    });

  }

}