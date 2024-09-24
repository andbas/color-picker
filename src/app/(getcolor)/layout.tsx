"use client";
import dynamic from "next/dynamic";

const Consent = dynamic(() => import("@/components/consent"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <Consent />
    </>
  );
}
