import { analyzeReport } from "@/lib/analyzer.js";

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text) {
      return Response.json({
        success: false,
        message: "No text provided for analysis",
      });
    }

    const analysis = analyzeReport(text);

    return Response.json({
      success: true,
      text,
      analysis,
    });
  } catch (error) {
    console.error("API Analyze Error:", error);
    return Response.json({
      success: false,
      message: "Analysis failed",
      error: error.message,
    }, { status: 500 });
  }
}
