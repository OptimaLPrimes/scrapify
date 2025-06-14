import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Bot, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 md:py-16">
      <section className="text-center mb-16 md:mb-24">
        <Bot className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">
          Welcome to <span className="text-primary">AetherScrape</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Your intelligent web scraping chatbot. Effortlessly extract, summarize, and classify web content with the power of AI.
        </p>
        <Link href="/chat">
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-primary/30 transition-shadow">
            Start Scraping Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16 md:mb-24">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="h-7 w-7 mr-3 text-accent" />
              Powerful Scraping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Extract comprehensive data: titles, meta tags, headings, text, links, images, tables, and JSON-LD from any URL.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Bot className="h-7 w-7 mr-3 text-accent" />
              AI-Powered Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Leverage LLMs to automatically summarize content, classify its type (blog, product, etc.), and structure it into clean JSON.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CheckCircle className="h-7 w-7 mr-3 text-accent" />
              User-Friendly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Enjoy a clean, Notion-like UI with dark/light modes, a chatbot interface, and easy data export (JSON/CSV).
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section className="mb-16 md:mb-24">
          <div className="grid md:grid-cols-1 gap-8 items-center"> {/* Changed md:grid-cols-2 to md:grid-cols-1 */}
              <div>
                <h2 className="text-3xl font-bold mb-6 font-headline">How It Works</h2>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">1. Input URL</h3>
                      <p className="text-muted-foreground">Provide any web page URL through our intuitive chatbot interface.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">2. Scrape & Process</h3>
                      <p className="text-muted-foreground">AetherScrape fetches the page, extracts key information, and sends it to our AI for analysis.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">3. Get Results</h3>
                      <p className="text-muted-foreground">Receive a structured JSON output with summaries, classifications, and all scraped data, ready for viewing or download.</p>
                    </div>
                  </li>
                </ol>
              </div>
              {/* Removed the div containing the Image component */}
          </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 font-headline">Ready to Dive In?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Experience the future of web scraping. Get started with AetherScrape and turn web pages into structured, actionable data.
        </p>
        <Link href="/chat">
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 shadow-lg hover:shadow-accent/30 transition-shadow border-primary hover:border-accent hover:text-accent">
            Try the Chat Scraper
          </Button>
        </Link>
      </section>
    </div>
  );
}
