import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Aperture, Cookie, Github, Home } from "lucide-react";

import { useSidebarMenu } from "@/hooks/use-sidebar-menu";
import { useConsent } from "@/hooks/use-consent";

export default function SidebarMenu() {
  const { sidebarOpen, setSidebarOpen } = useSidebarMenu();
  const { setConsentDialogOpen } = useConsent();

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            As soon as I'll have something to add here, I'll add it here.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <nav className="grid items-start text-sm font-medium">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/app"
              className="flex items-center gap-3 rounded-md bg-muted px-3 py-3 text-primary transition-all hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              <Aperture className="h-4 w-4" />
              GetColor
            </Link>
          </nav>
        </div>
        <SheetFooter>
          <div className="flex gap-4 mx-auto">
            <ModeToggle variant="ghost" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setConsentDialogOpen(true);
                setSidebarOpen(false);
              }}
            >
              <Cookie />
              <span className="sr-only">Consent Mode</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSidebarOpen(false);
                window.open(
                  "https://github.com/andbas/color-picker/",
                  "_blank"
                );
              }}
            >
              {/* TODO: Add a custom icon as Github is deprecated in lucide */}
              <Github />
              <span className="sr-only">Github</span>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
