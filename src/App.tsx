import "./App.css";
import { useState } from "react";
import { ModeToggle } from "./components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";
import VideoFeed from "./components/video-feed";
import { Button } from "./components/ui/button";
import { Cookie, Github } from "lucide-react";
import { useConsent } from "./hooks/use-consent";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setConsentDialogOpen } = useConsent();

  return (
    <>
      <div className="justify-center bg-background">
        <div className="max-w-screen-sm mx-auto">
          <VideoFeed
            onOtherClick={() => {
              setMenuOpen(true);
            }}
          />
        </div>
      </div>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              As soon as I'll have something to add here, I'll add it here.
            </SheetDescription>
          </SheetHeader>
          <div className="text-sm text-muted-foreground my-10">
            So great that you're using the app! Thanks for your support!
          </div>
          <SheetFooter>
            <div className="flex gap-4 mx-auto">
              <ModeToggle variant="ghost" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setConsentDialogOpen(true);
                  setMenuOpen(false);
                }}
              >
                <Cookie />
                <span className="sr-only">Consent Mode</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  window.open(
                    "https://github.com/andbas/color-picker/",
                    "_blank"
                  )
                }
              >
                <Github />
                <span className="sr-only">Github</span>
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default App;
