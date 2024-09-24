"use client";

import { createContext, useContext, useState } from "react";

interface SidebarMenuType {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

const SidebarMenuContext = createContext<SidebarMenuType | null>(null);

export function SidebarMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = {
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <SidebarMenuContext.Provider value={value}>
      {children}
    </SidebarMenuContext.Provider>
  );
}

export function useSidebarMenu() {
  const context = useContext(SidebarMenuContext);
  if (!context) {
    throw new Error("useSidebarMenu must be used within a SidebarMenuProvider");
  }
  return context;
}
