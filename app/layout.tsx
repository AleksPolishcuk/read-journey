import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "Read Journey",
  description: "Read Journey app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
