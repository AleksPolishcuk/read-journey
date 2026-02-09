import AuthShell from "@/components/auth/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell variant="login">
      <LoginForm />
    </AuthShell>
  );
}
