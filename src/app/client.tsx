"use client";

import { ThemeProvider } from "@/components/theme-provider";
// import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../App"), { ssr: false });

export function ClientOnly() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  );
}
