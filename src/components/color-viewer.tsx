import { Pixel } from "@/types";
import { isLight, pixelToHex } from "@/utils";
import { ClipboardCopy, Sparkle } from "lucide-react";
import { useState } from "react";

interface ColorViewerProps {
  pixel: Pixel;
}

export function ColorViewer({ pixel }: ColorViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(pixelColor).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const pixelColor = pixelToHex(pixel);
  return (
    <div
      onClick={handleClick}
      className={`flex w-full justify-center items-center h-12 transition-colors duration-200 ${
        isLight(pixelColor) ? "text-black" : "text-white"
      }`}
      style={{
        backgroundColor: pixelColor,
      }}
    >
      <div className="flex items-center relative">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
            copied ? "fade-in" : "fade-out opacity-0"
          }`}
        >
          <Sparkle className="w-5 h-5 pr-3" />
          <ClipboardCopy className="w-5 h-5" />
          <Sparkle className="w-5 h-5 pl-3" />
        </span>

        <span
          className={`font-mono transition-opacity duration-200 ${
            copied ? "fade-out opacity-0" : "fade-in"
          }`}
        >
          {pixelColor}
        </span>
      </div>
    </div>
  );
}
