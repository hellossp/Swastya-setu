import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "SwasthyaSetu",
  description: "Smart Medical Report Analyzer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">

        <Navbar />

        <div className="flex-1 flex flex-col">
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}