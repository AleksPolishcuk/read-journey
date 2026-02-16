import { AuthCard } from "@/components/auth/AuthCard/AuthCard";
import { AuthPanel } from "@/components/auth/AuthPanel/AuthPanel";
import { AuthHeading } from "@/components/auth/AuthHeading/AuthHeading";
import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";
import { PhonePreview } from "@/components/auth/PhoneCard/PhoneCard";

export default function RegisterPage() {
  return (
    <AuthCard>
      <AuthPanel>
        <AuthHeading />
        <RegisterForm />
      </AuthPanel>

      <PhonePreview />
    </AuthCard>
  );
}
