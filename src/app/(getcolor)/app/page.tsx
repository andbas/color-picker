"use client";

import VideoFeed from "@/components/video-feed";

export default function AppPage() {
  return (
    <div className="justify-center bg-background">
      <div className="max-w-xs mx-auto">
        <VideoFeed />
      </div>
    </div>
  );
}