// @ts-ignore
import pallete from "color-namer/lib/colors/ntc";

import { colorToUrlSlug } from "@/utils";
import ColorDescription from "./color-description";

export function generateStaticParams() {
  return pallete.map((color: { name: string; hex: string }) => ({
    name: colorToUrlSlug(color.name),
  }));
}

const slugToName = (slug: string) => {
  return slug.split("_").map(capitalize).join(" ");
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function generateMetadata({ params }: { params: { name: string } }) {
  return {
    title: "GetColor.io: " + slugToName(params.name) + " color page",
  };
}

export default function ColorPage({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <>
      <ColorDescription colorSlug={name} />
    </>
  );
}
