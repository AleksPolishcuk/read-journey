import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Read Journey",
  description: "Read Journey App",
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
            position="top-center"
            toastOptions={{
              duration: 3000,
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
