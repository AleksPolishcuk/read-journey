import { AuthCard } from "@/components/auth/AuthCard/AuthCard";
import { AuthPanel } from "@/components/auth/AuthPanel/AuthPanel";
import { AuthHeading } from "@/components/auth/AuthHeading/AuthHeading";
import { LoginForm } from "@/components/auth/LoginForm/LoginForm";
import { PhonePreview } from "@/components/auth/PhoneCard/PhoneCard";

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthPanel>
        <AuthHeading />
        <LoginForm />
      </AuthPanel>

      <PhonePreview />
    </AuthCard>
  );
}
