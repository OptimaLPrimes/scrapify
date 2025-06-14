
import { FileText, Construction } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-12 text-center">
      <Construction className="mx-auto h-24 w-24 text-primary mb-8" />
      <h1 className="text-4xl font-bold mb-4 font-headline">
        Documentation
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Our documentation is currently under construction. We're working hard to provide you with comprehensive guides and API references.
      </p>
      <p className="text-lg text-muted-foreground mb-6">
        In the meantime, you can explore the application or check back soon!
      </p>
      <Link href="/">
        <Button size="lg">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}

// Placeholder pages for links in footer
export function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground">This is a placeholder for the Privacy Policy. Content coming soon.</p>
    </div>
  )
}

export function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground">This is a placeholder for the Terms of Service. Content coming soon.</p>
    </div>
  )
}
