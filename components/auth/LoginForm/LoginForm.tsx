"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import styles from "./LoginForm.module.css";
import { Input } from "@/components/common/Input/Input";
import { loginValidationSchema } from "@/lib/validation/authSchemas";
import { useLoginMutation } from "@/services/authApi";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { setCredentials } from "@/redux/features/authSlice";

type FormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      toast.success("Logged in");
      router.replace("/recommended");
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Mail"
        type="email"
        placeholder="Your@email.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Your password here"
        error={errors.password?.message}
        showToggle
        isPasswordVisible={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        {...register("password")}
      />

      <div className={styles.row}>
        <button className={styles.submit} type="submit" disabled={isLoading}>
          Log in
        </button>

        <Link className={styles.link} href="/register">
          Don&apos;t have an account?
        </Link>
      </div>
    </form>
  );
}
