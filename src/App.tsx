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
import { useLocalStorage } from "@uidotdev/usehooks";
import { Consent } from "./components/consent";

type Consent =
  | "all-cookies-accepted"
  | "reject-non-essential-cookies"
  | undefined;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consent, setConsent] = useLocalStorage<Consent>(
    "cookies-consent",
    undefined
  );

  return (
    <>
      <div className="justify-center bg-background">
        <div className="max-w-screen-sm mx-auto">
          {consent && (
            <VideoFeed
              onOtherClick={() => {
                setMenuOpen(true);
              }}
            />
          )}
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
              <ModeToggle />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <Consent consent={consent} setConsent={setConsent} />
    </>
  );
}

export default App;
