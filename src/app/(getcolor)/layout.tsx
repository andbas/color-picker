"use client";
import { ConsentProvider } from "@/hooks/use-consent";
import { SidebarMenuProvider } from "@/hooks/use-sidebar-menu";
import Consent from "@/components/consent";
import SidebarMenu from "@/components/sidebar-menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConsentProvider>
        <SidebarMenuProvider>
          {children}

          <SidebarMenu />
          <Consent />
        </SidebarMenuProvider>
      </ConsentProvider>
    </>
  );
}
