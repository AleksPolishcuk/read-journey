import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header/Header";
import { AuthGuard } from "@/components/auth/AuthGuard/AuthGuard";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <Header />
      {children}
    </AuthGuard>
  );
}
