import AuthShell from "@/components/auth/layout/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell variant="register">
      <RegisterForm />
    </AuthShell>
  );
}
