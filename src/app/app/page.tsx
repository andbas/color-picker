import VideoFeed from "@/components/video-feed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GetColor.io: Application",
  description:
    "GetColor.io point camera to the color you want to pick and get the color code",
};

export default function AppPage() {
  return (
    <div className="justify-center bg-background">
      <div className="max-w-md mx-auto">
        <VideoFeed />
      </div>
    </div>
  );
}
