import VideoFeed from "./components/video-feed";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="min-h-screen justify-center bg-background">
        <div>
          <VideoFeed />
        </div>
        <div className="flex flex-col items-center mt-4">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
