"use client";

import Link from "next/link";
import { Aperture, Menu, Scale } from "lucide-react";
import { useSidebarMenu } from "@/hooks/use-sidebar-menu";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSidebarOpen } = useSidebarMenu();

  return (
    <>
      <header className="w-full sticky z-50 top-0 left-0 bg-background">
        <div className="max-w-xs flex justify-between items-center py-4 mx-auto">
          <Link href="/" className="flex gap-3">
            <Aperture className="w-6 h-6" />
            GetColor.io
          </Link>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-80">{children}</main>
      <footer className="text-card-foreground flex flex-col space-y-1.5 my-10">
        <div className="flex items-center justify-center">
          <Link
            href="/app"
            className="flex items-center gap-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 transition-all"
          >
            Start Detecting Colors
          </Link>
        </div>
        <div className="flex gap-4 mx-auto pt-4">
          <Link
            href="/legal"
            className="flex items-center gap-3 rounded-lg transition-all hover:underline text-muted-foreground"
          >
            <Scale className="h-4 w-4" />
            Privacy and Legal
          </Link>
        </div>
      </footer>
    </>
  );
}
