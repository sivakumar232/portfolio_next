import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sivakumar",
  description: "Portfolio of Sivakumar - Full Stack Developer",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Hanken Grotesk */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Theme Initialization Script - Runs before page render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Check localStorage for saved theme, default to dark if not found
              const savedTheme = localStorage.getItem('theme');
              const theme = savedTheme || 'dark';

              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              }

              // Save default theme if not already saved
              if (!savedTheme) {
                localStorage.setItem('theme', 'dark');
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
