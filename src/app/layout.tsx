import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

/** Single typeface across the site: Montserrat, 400–800. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI-First B.Tech in Computer Science | upGrad School of Technology",
  description:
    "A four-year residential B.Tech in Computer Science built for the AI era — Quantum Computing, GenAI & ML, Full Stack Development and Cloud Innovation. Admissions open via uGNET.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}
