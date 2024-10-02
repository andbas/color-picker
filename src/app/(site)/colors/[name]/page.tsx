// @ts-ignore
import pallete from "color-namer/lib/colors/ntc";

import { colorToUrlSlug } from "@/utils";
import ColorDescription from "./color-description";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    title:
      "GetColor.io | " +
      slugToName(params.name) +
      " | HEX, Description, Origin and Characteristics",
  };
}

export default function ColorPage({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/colors">Colors</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ColorDescription colorSlug={name} />
    </>
  );
}
