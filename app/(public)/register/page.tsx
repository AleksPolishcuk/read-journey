import { PublicOnly } from "@/components/auth/PublicOnly/PublicOnly";
import { AuthCard } from "@/components/auth/AuthCard/AuthCard";
import { AuthPanel } from "@/components/auth/AuthPanel/AuthPanel";
import { AuthHeading } from "@/components/auth/AuthHeading/AuthHeading";
import { RegisterForm } from "@/components/auth/RegisterForm/RegisterForm";
import { PhonePreview } from "@/components/auth/PhoneCard/PhoneCard";
import { OnlyMobileAndDesktop } from "@/components/common/Responsive/OnlyMobileAndDesktop";

export default function RegisterPage() {
  return (
    <PublicOnly>
      <AuthCard>
        <AuthPanel>
          <AuthHeading />
          <RegisterForm />
        </AuthPanel>

        <OnlyMobileAndDesktop>
          <PhonePreview />
        </OnlyMobileAndDesktop>
      </AuthCard>
    </PublicOnly>
  );
}
