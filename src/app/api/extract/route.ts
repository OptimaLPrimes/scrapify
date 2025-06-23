import { NextRequest, NextResponse } from 'next/server';
import { scrapeWebPage } from '@/lib/scraper';
import { extractData } from '@/ai/flows/extract-data';

// Basic URL validation
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const urlToScrape = searchParams.get('url');
  const query = searchParams.get('query');

  if (!urlToScrape || !query) {
    return NextResponse.json({ error: 'URL and query parameters are required' }, { status: 400 });
  }
  
  if (!isValidUrl(urlToScrape)) {
    return NextResponse.json({ error: 'Invalid URL format provided' }, { status: 400 });
  }

  try {
    const scrapedContent = await scrapeWebPage(urlToScrape);

    // Combine relevant text content for the AI to analyze
    const textContent = [
      scrapedContent.title,
      scrapedContent.meta.description,
      ...Object.values(scrapedContent.headings).flat(),
      ...scrapedContent.paragraphs,
    ].join(' \n ');
    
    // Call the AI flow to extract the specific data
    const extractionResult = await extractData({
      query: query,
      content: textContent,
    });
    
    return NextResponse.json(extractionResult, { status: 200 });

  } catch (error) {
    console.error('Extraction process failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: `Extraction failed: ${errorMessage}` }, { status: 500 });
  }
}
