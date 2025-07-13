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
import { Loader2, Search, X } from "lucide-react"

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
})

interface UrlInputFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function UrlInputForm({ onSubmit, isLoading }: UrlInputFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  const urlValue = form.watch("url");

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    await onSubmit(values.url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Enter URL to Scrape</FormLabel>
              <div className="flex items-center space-x-2">
                <div className="relative w-full">
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      {...field} 
                      className="text-base md:text-lg py-6 pr-12"
                      aria-label="URL to scrape"
                    />
                  </FormControl>
                  {urlValue && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => form.setValue('url', '')}
                      aria-label="Clear input"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <Button type="submit" disabled={isLoading} size="lg" className="py-6 px-6">
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Search className="h-6 w-6" />
                  )}
                  <span className="sr-only md:not-sr-only md:ml-2">Scrape</span>
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
