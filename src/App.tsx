import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="justify-center bg-background">
        <div className="max-w-screen-sm mx-auto">
          <VideoFeed
            onOtherClick={() => {
              setMenuOpen(true);
            }}
          />
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
    </ThemeProvider>
  );
}

export default App;
