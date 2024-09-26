import SidebarMenu from "@/components/sidebar-menu";
import "../index.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConsentProvider } from "@/hooks/use-consent";
import { SidebarMenuProvider } from "@/hooks/use-sidebar-menu";
import { Metadata } from "next";
import Consent from "@/components/consent";

export const metadata: Metadata = {
  title: "GetColor: Camera Color Picker",
  description:
    "The application allows you to pick colors from your surroundings using your camera",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="ui-theme"
          enableSystem
          disableTransitionOnChange
        >
          <ConsentProvider>
            <SidebarMenuProvider>
              {children}

              <SidebarMenu />
              <Consent />
            </SidebarMenuProvider>
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
