import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, Home, LogIn } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <Card className="w-full max-w-md border-none shadow-none md:border md:shadow-sm text-center">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <FileQuestion className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Page not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pb-8">
          <Button asChild className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-11">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" /> Go to login
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        PC Repair Invoice Generator &bull; v1.0
      </p>
    </div>
  );
}
