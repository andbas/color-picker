"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { colorToUrlSlug } from "@/utils";

interface Color {
  name: string;
  hex: string;
  file: string;
}

export default function ColorsList() {
  const [colors, setColors] = useState<Color[]>([]);
  useEffect(() => {
    fetch("/colors/colors.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setColors(data);
      });
  }, []);

  return (
    <ul className="flex flex-col gap-2 mt-6">
      {colors.map((color) => (
        <li key={color.name}>
          <Link
            href={`/colors/${colorToUrlSlug(color.name)}`}
            className="flex items-center gap-2 p-2 transition-all hover:text-primary "
          >
            <div
              className="w-5 h-5 border border-secondary border-opacity-50 rounded-md inline-block mr-2"
              style={{ backgroundColor: `#${color.hex}` }}
            ></div>
            <div>{color.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
