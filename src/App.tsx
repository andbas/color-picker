import VideoFeed from "./components/VideoFeed";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold mb-4">Pixel Color Detector</h1>
        <VideoFeed />
      </div>
    </div>
  );
}

export default App;
