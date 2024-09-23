import { Metadata } from "next";

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
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
