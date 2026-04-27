import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JOBINOCULARS | We watch the internet for jobs",
  description: "JOBINOCULARS automatically watches the internet for the best job listings so you don't have to. High-paying tech, service, and logistics roles.",
  keywords: ["JOBINOCULARS", "jobs", "careers", "job board", "automated jobs", "hiring", "tech jobs", "high performance"],
  metadataBase: new URL('https://jobinoculars.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "JOBINOCULARS | Automated Job Discovery",
    description: "We watch the internet for the best job listings and post them here automatically.",
    type: "website",
    url: '/',
    siteName: 'JOBINOCULARS',
  },
  twitter: {
    card: "summary_large_image",
    title: "JOBINOCULARS | Automated Job Discovery",
    description: "We watch the internet for the best job listings and post them here automatically.",
  },
  icons: {
    icon: '/logos/binoculars.png',
    apple: '/logos/binoculars.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <main className="container">
          {children}
        </main>
        <footer className="container" style={{ marginTop: '4rem', padding: '2rem 0', borderTop: 'var(--border-width) solid var(--border)' }}>
          <p className="mono" suppressHydrationWarning>© {new Date().getFullYear()} JOBINOCULARS. WATCHING THE WEB.</p>
        </footer>
      </body>
    </html>
  );
}
