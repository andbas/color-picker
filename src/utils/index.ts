import { Pixel } from "@/types";
import { isLight } from "color-2-name";
import namer from "color-namer";

const closest = (colorStr: string) => {
  const { ntc } = namer(colorStr);
  return ntc[0];
};

export { isLight, closest };

export function pixelToHex(pixel: Pixel) {
  return `#${pixel.color[0]
    .toString(16)
    .padStart(2, "0")
    .toUpperCase()}${pixel.color[1]
    .toString(16)
    .padStart(2, "0")
    .toUpperCase()}${pixel.color[2]
    .toString(16)
    .padStart(2, "0")
    .toUpperCase()}`;
}

export function pixelToX(pixel: Pixel, mode?: "hex" | "rgb" | "name") {
  if (mode === "rgb") {
    return `rgb(${pixel.color.join(", ")})`;
  }
  if (mode === "name") {
    return closest(pixelToHex(pixel)).name;
  }

  return pixelToHex(pixel);
}
