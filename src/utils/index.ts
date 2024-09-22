import { Pixel } from "@/types";
import { isLight } from "color-2-name";

export { isLight };

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
