"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import styles from "./RegisterForm.module.css";
import { Input } from "@/components/common/Input/Input";
import { registerValidationSchema } from "@/lib/validation/authSchemas";
import { useRegisterMutation } from "@/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/authSlice";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(setCredentials(res));
      toast.success("Registered");
      router.replace("/recommended");
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="Ilona Ratushniak"
        error={errors.name?.message}
        {...register("name")}
      />

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
          Registration
        </button>

        <Link className={styles.link} href="/login">
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
