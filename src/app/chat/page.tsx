"use client"

import { useState } from "react";
import { UrlInputForm } from "@/components/url-input-form";
import { ScrapeResultDisplay } from "@/components/scrape-result-display";
import type { ScrapedData, ScrapeHistoryItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/use-local-storage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { generateUniqueId } from "@/lib/utils";

const HISTORY_STORAGE_KEY = "scrapifyHistory";

export default function ChatPage() {
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [history, setHistory] = useLocalStorage<ScrapeHistoryItem[]>(HISTORY_STORAGE_KEY, []);

  const handleScrape = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setScrapedData(null);

    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      setScrapedData(data as ScrapedData);
      toast({
        title: "Scraping Successful!",
        description: `Data fetched from ${url}`,
      });

      // Add to history
      const historyItem: ScrapeHistoryItem = { ...data, id: generateUniqueId() };
      setHistory(prevHistory => [historyItem, ...prevHistory.slice(0, 49)]); // Keep max 50 items

    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Scraping Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Chat Scraper</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Enter a URL below to scrape its content. Scrapify will extract data, summarize it, and classify its type using AI.
        </p>
      </header>
      
      <section className="mb-8 p-6 border rounded-lg shadow-sm bg-card">
        <UrlInputForm onSubmit={handleScrape} isLoading={isLoading} />
      </section>

      {error && (
         <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {scrapedData && (
        <section>
          <ScrapeResultDisplay data={scrapedData} />
        </section>
      )}

      {!isLoading && !scrapedData && !error && (
        <div className="text-center py-10">
          <p className="text-muted-foreground text-lg">Enter a URL to begin scraping. Results will appear here.</p>
        </div>
      )}
    </div>
  );
}
