'use server';

/**
 * @fileOverview An AI agent that extracts a specific piece of data from a web page.
 *
 * - extractData - A function that handles the data extraction process.
 * - ExtractDataInput - The input type for the extractData function.
 * - ExtractDataOutput - The return type for the extractData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDataInputSchema = z.object({
  query: z.string().describe('The specific piece of data the user wants to extract (e.g., "product price", "main headline").'),
  content: z.string().describe('The text content of the web page (headings and paragraphs).'),
});
export type ExtractDataInput = z.infer<typeof ExtractDataInputSchema>;

const ExtractDataOutputSchema = z.object({
  extractedValue: z.string().describe('The extracted data value. If the value cannot be found, this should be "Not found".'),
});
export type ExtractDataOutput = z.infer<typeof ExtractDataOutputSchema>;

export async function extractData(input: ExtractDataInput): Promise<ExtractDataOutput> {
  return extractDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDataPrompt',
  input: {schema: ExtractDataInputSchema},
  output: {schema: ExtractDataOutputSchema},
  prompt: `You are an expert data extraction assistant. Your task is to analyze the provided web page content and find the specific piece of information requested by the user.

User's Request: Find the "{{{query}}}" from the content.

Web Page Content:
{{{content}}}

Extract the single value corresponding to the user's request. If you cannot find the information, respond with "Not found".`,
});

const extractDataFlow = ai.defineFlow(
  {
    name: 'extractDataFlow',
    inputSchema: ExtractDataInputSchema,
    outputSchema: ExtractDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
