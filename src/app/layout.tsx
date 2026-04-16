import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhrumil Mankodiya - Product Designer & AI Product Manager",
  description: "Chat with an AI version of Dhrumil Mankodiya. Ask about his experience, projects, skills, and ventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
