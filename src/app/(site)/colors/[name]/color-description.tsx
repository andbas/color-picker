"use client";

import { useEffect, useState } from "react";

interface Color {
  name: string;
  hex: string;
  description: string;
  originOfName: string;
  usageInDesign: {
    interiorDesign: string;
    fashion: string;
    graphicDesign: string;
  };
  visualCharacteristics: {
    mood: string;
    complementaryColors: string;
  };
}

export default function ColorDescription({ colorSlug }: { colorSlug: string }) {
  const [color, setColor] = useState<Color | null>(null);
  useEffect(() => {
    fetch(`/colors/${colorSlug}.json`)
      .then((res) => res.json())
      .then((data) => setColor(data));
  }, [colorSlug]);

  return (
    color && (
      <>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-4">
            <div
              className="text-2xl w-10 h-10 border border-white border-opacity-50 hover:border-opacity-70 rounded-md"
              style={{ backgroundColor: "#" + color.hex }}
            ></div>
            <h1 className="text-4xl font-bold">{color.name}</h1>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-2xl font-bold">HEX: </h2>{" "}
            <h3 className="text-xl font-bold">#{color.hex}</h3>
          </div>
          <div className="flex flex-col gap-1 pt-4">
            <h2 className="text-2xl font-bold">Description</h2>
            <p className="text-md">{color.description}</p>
          </div>
          <div className="flex flex-col gap-1 pt-4">
            <h2 className="text-2xl font-bold">Origin of Name</h2>
            <p className="text-md">{color.originOfName}</p>
          </div>
          <div className="flex flex-col gap-1 pt-4">
            <h2 className="text-2xl font-bold">Usage in Design</h2>

            <h3 className="text-lg font-bold pt-2">Interior Design</h3>
            <p className="text-md">{color.usageInDesign.interiorDesign}</p>

            <h3 className="text-lg font-bold pt-2">Fashion</h3>
            <p className="text-md">{color.usageInDesign.fashion}</p>

            <h3 className="text-lg font-bold pt-2">Graphic Design</h3>
            <p className="text-md">{color.usageInDesign.graphicDesign}</p>
          </div>
          <div className="flex flex-col gap-1 pt-4">
            <h2 className="text-2xl font-bold">Visual Characteristics</h2>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold pt-2">Mood</h3>
              <p className="text-md">{color.visualCharacteristics.mood}</p>

              <h3 className="text-lg font-bold pt-2">Complementary Colors</h3>
              <p className="text-md">
                {color.visualCharacteristics.complementaryColors}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
}
