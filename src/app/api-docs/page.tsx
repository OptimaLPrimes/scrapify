import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeXml, ExternalLink } from "lucide-react";

export default function ApiDocsPage() {
  const apiUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/scrape` : "/api/scrape";

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center">
          <CodeXml className="h-8 w-8 mr-3" /> API Documentation
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Integrate AetherScrape&apos;s capabilities into your own applications using our simple API.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Scrape Endpoint</CardTitle>
          <CardDescription>
            Fetch, scrape, and analyze web content with a single GET request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Request</h3>
            <p className="mb-1">
              <span className="font-semibold text-primary">Method:</span> GET
            </p>
            <p className="mb-1">
              <span className="font-semibold text-primary">URL:</span>
            </p>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
              <code>{apiUrl}?url=&lt;URL_TO_SCRAPE&gt;</code>
            </pre>
            <p className="mt-2 text-sm text-muted-foreground">
              Replace <code>&lt;URL_TO_SCRAPE&gt;</code> with the URL you want to process (e.g., <code>https://example.com</code>). Ensure the URL is URL-encoded.
            </p>
            <a href={`${apiUrl}?url=https://example.com`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center mt-2">
                Try example: {apiUrl}?url=https://example.com <ExternalLink className="h-3 w-3 ml-1"/>
            </a>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Query Parameters</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <code className="bg-muted px-1 rounded-sm">url</code> (string, required): The full URL of the web page to scrape.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Successful Response (200 OK)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Returns a JSON object containing the scraped data, AI summary, and content type.
            </p>
            <pre className="bg-muted p-3 rounded-md text-sm max-h-96 overflow-auto font-code">
{`{
  "url": "string",
  "scrapedAt": "string (ISO Date)",
  "title": "string | undefined",
  "meta": {
    "description": "string | undefined",
    "keywords": "string | undefined"
  },
  "headings": {
    "h1": ["string"],
    "h2": ["string"],
    // ... h3-h6
  },
  "paragraphs": ["string"],
  "links": [{ "text": "string", "href": "string" }],
  "images": [{ "src": "string", "alt": "string" }],
  "tables": [{ "id": "string", "caption": "string", "headers": ["string"], "rows": [["string"]] }],
  "jsonLd": ["any"],
  "aiSummary": "string | undefined",
  "aiContentType": "string | undefined"
}`}
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Error Responses</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong className="text-destructive">400 Bad Request:</strong> If the <code className="bg-muted px-1 rounded-sm">url</code> parameter is missing or invalid, or if the target URL could not be reached/processed.
                <pre className="bg-muted p-2 mt-1 rounded-md font-code text-xs">{`{ "error": "URL parameter is required" }`}</pre>
                <pre className="bg-muted p-2 mt-1 rounded-md font-code text-xs">{`{ "error": "Invalid URL format provided" }`}</pre>
                 <pre className="bg-muted p-2 mt-1 rounded-md font-code text-xs">{`{ "error": "Could not reach or process URL: ..." }`}</pre>
              </li>
              <li>
                <strong className="text-destructive">500 Internal Server Error:</strong> If an unexpected error occurs during the scraping or AI processing.
                <pre className="bg-muted p-2 mt-1 rounded-md font-code text-xs">{`{ "error": "Scraping failed: ..." }`}</pre>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
