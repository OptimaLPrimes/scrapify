"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Terminal, Sparkles } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  query: z.string().min(3, { message: "Query must be at least 3 characters long." }),
})

export default function ExtractPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ value: string; query: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      query: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/extract?url=${encodeURIComponent(values.url)}&query=${encodeURIComponent(values.query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setResult({ value: data.extractedValue, query: values.query });
      toast({
        title: "Extraction Successful!",
        description: `Found value for "${values.query}"`,
      });

    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Extraction Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Dynamic Extractor</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Extract specific data points like price, name, or weather from any URL using AI.
        </p>
      </header>

      <section className="mb-8 p-6 border rounded-lg shadow-sm bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/product/123" {...field} className="text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Data to Extract</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Product price, Author name, Today's high temperature" {...field} className="text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              Extract Data
            </Button>
          </form>
        </Form>
      </section>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isLoading && (
        <section className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-accent" />
                <Skeleton className="h-7 w-48" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-5 w-64" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-14 w-full rounded-md" />
            </CardContent>
          </Card>
        </section>
      )}

      {result && !isLoading && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-accent" />
                Extraction Result
              </CardTitle>
              <CardDescription>
                The value for <span className="font-semibold text-primary">{`"${result.query}"`}</span> is:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-mono bg-muted p-4 rounded-md">
                {result.value}
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}
