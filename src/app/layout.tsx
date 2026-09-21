import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaibhavgaikwad0072.github.io"),
  title: {
    default: "Vaibhav Gaikwad | Software Engineer & AI Systems Builder",
    template: "%s | Vaibhav Gaikwad",
  },
  description:
    "Portfolio of Vaibhav Gaikwad, a software engineer building scalable backend systems, machine learning applications, and LLM-powered products.",
  applicationName: "Vaibhav Gaikwad Portfolio",
  authors: [{ name: "Vaibhav Gaikwad", url: "https://vaibhavgaikwad0072.github.io" }],
  creator: "Vaibhav Gaikwad",
  keywords: [
    "Vaibhav Gaikwad",
    "software engineer",
    "AI systems builder",
    "backend engineer",
    "machine learning",
    "LLM applications",
    "FastAPI",
    "React",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://vaibhavgaikwad0072.github.io",
    title: "Vaibhav Gaikwad | Software Engineer & AI Systems Builder",
    description:
      "Explore Vaibhav Gaikwad's software engineering, machine learning, and LLM projects.",
    siteName: "Vaibhav Gaikwad Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Vaibhav Gaikwad | Software Engineer & AI Systems Builder",
    description:
      "Portfolio of Vaibhav Gaikwad: scalable backend systems, machine learning, and LLM applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
