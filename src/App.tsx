import VideoFeed from "./components/video-feed";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="justify-center bg-background">
        <div className="max-w-screen-sm mx-auto">
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
