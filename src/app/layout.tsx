import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google'; // Standard Next.js font optimization
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/components/app-sidebar';
import { cn } from '@/lib/utils';

// Using next/font as per Next.js best practices, instead of <link> tags for Google Fonts
const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'AetherScrape - Smart Web Scraper',
  description: 'Intelligent web scraping chatbot tool by AetherScrape.',
  icons: {
    icon: '/favicon.ico', // Assuming a favicon might be added later
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
         {/* Keep existing preconnects if any, next/font handles font loading optimally */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        {/* Note: next/font handles loading, these are for good measure or specific cases if needed elsewhere */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontInter.variable,
          fontSourceCodePro.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppSidebar>
            {children}
          </AppSidebar>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
