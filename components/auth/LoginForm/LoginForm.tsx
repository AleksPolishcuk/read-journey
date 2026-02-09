"use client";

import styles from "./LoginForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/lib/validation/schemas";
import Input from "@/components/ui/Input/Input";
import PasswordInput from "@/components/ui/PasswordInput/PasswordInput";
import Button from "@/components/ui/Button/Button";
import { useLoginMutation } from "@/lib/api/authApi";
import { useAppDispatch } from "@/redux/index";
import { setCredentials } from "@/redux/auth/authSlice";
import { routes } from "@/lib/constants/routes";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginValidationSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await login(values).unwrap();
      dispatch(setCredentials({ token: data.token, user: data.user }));
      router.replace(routes.root);
    } catch (e) {
      alert(getApiErrorMessage(e));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Mail:"
        placeholder="Your@email.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <PasswordInput
        label="Password:"
        placeholder="Your password here"
        {...register("password")}
        error={errors.password?.message}
      />

      <div className={styles.actions}>
        <Button type="submit" fullWidth disabled={isLoading}>
          Log In
        </Button>

        <Link className={styles.link} href={routes.register}>
          Don’t have an account?
        </Link>
      </div>
    </form>
  );
}

function getApiErrorMessage(err: unknown): string {
  if (!err || typeof err !== "object") return "Something went wrong";
  const anyErr = err as any;
  return (
    anyErr?.data?.message ||
    anyErr?.error ||
    anyErr?.message ||
    "Something went wrong"
  );
}
