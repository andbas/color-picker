"use client";

import { Pixel } from "@/types";
import {
  colorToUrlSlug,
  isLight,
  pixelToHex,
  pixelToUrlSlug,
  pixelToX,
} from "@/utils";
import { useDebounce } from "@uidotdev/usehooks";
import { ClipboardCopy, Info, Sparkle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ColorViewerProps {
  pixel: Pixel;
  mode?: "hex" | "rgb" | "name";
  delay?: number;
}

export function ColorViewer({
  pixel,
  mode = "hex",
  delay = 150,
}: ColorViewerProps) {
  const [copied, setCopied] = useState(false);

  const pixelColor = pixelToHex(pixel);
  const pixelValue = pixelToX(pixel, mode);
  const value =
    mode === "name"
      ? useDebounce(pixelValue, delay)
      : useDebounce(pixelValue, 0);

  const handleClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div
      className={`flex w-full justify-center items-center h-12 transition-colors duration-200 relative ${
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
          {value}
        </span>
      </div>
      <div
        onClick={handleClick}
        className="absolute left-0 top-0 w-5/6 h-full cursor-pointer"
      ></div>

      <Link
        href={`/colors/${
          mode === "name" ? colorToUrlSlug(value) : pixelToUrlSlug(pixel)
        }`}
        className="absolute right-0 top-0 w-1/6 h-full cursor-pointer flex items-center justify-center"
      >
        <Info className="w-6 h-6" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
