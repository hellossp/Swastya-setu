import UploadBox from "@/components/upload/UploadBox";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-[#F5EFE6] px-6 py-12">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-[#7A3B2E] mb-4">
            Upload Medical Report
          </h1>

          <p className="text-gray-700 text-lg">
            Upload your pathology report for smart analysis
          </p>

          <p className="text-[#5c4033] mt-2">
            ଆପଣଙ୍କ ରିପୋର୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ
          </p>

        </div>

        <UploadBox />

      </div>

    </main>
  );
}