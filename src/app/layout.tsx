import type { Metadata } from "next";
import "./globals.css";
import { GifProvider } from "@/context/GifContext";

export const metadata: Metadata = {
  title: "GIPHY | Fedica Take Home",
  description: "Filter your favourite GIFs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GifProvider>{children}</GifProvider>
      </body>
    </html>
  );
}
