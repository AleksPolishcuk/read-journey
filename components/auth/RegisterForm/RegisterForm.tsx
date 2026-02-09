"use client";

import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "@/lib/validation/schemas";
import Input from "@/components/ui/Input/Input";
import PasswordInput from "@/components/ui/PasswordInput/PasswordInput";
import Button from "@/components/ui/Button/Button";
import { useRegisterMutation } from "@/lib/api/authApi";
import { useAppDispatch } from "@/redux/index";
import { setCredentials } from "@/redux/auth/authSlice";
import { routes } from "@/lib/constants/routes";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerValidationSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await registerUser(values).unwrap();
      dispatch(setCredentials({ token: data.token, user: data.user }));
      router.replace(routes.root);
    } catch (e) {
      alert(getApiErrorMessage(e));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Name:"
        placeholder="Your name"
        {...register("name")}
        error={errors.name?.message}
      />

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
          Registration
        </Button>

        <Link className={styles.link} href={routes.login}>
          Already have an account?
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
