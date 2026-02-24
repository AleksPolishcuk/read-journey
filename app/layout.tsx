import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Read Journey",
    template: "%s | Read Journey",
  },
  description:
    "Read Journey — track your reading progress, build your personal library, and discover new books.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Read Journey",
    description:
      "Track your reading progress, build your personal library, and discover new books.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
