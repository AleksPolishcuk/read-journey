"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuth } from "@/redux/features/authSlice";
import { api } from "@/services/api";
import styles from "./LogoutButton.module.css";

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    try {
      await logout().unwrap();
    } catch (e: any) {
      const msg = e?.data?.message || e?.error || "Logout failed";
      toast.error(msg);
    } finally {
      dispatch(clearAuth());
      dispatch(api.util.resetApiState());
      router.replace("/");
    }
  };

  return (
    <button type="button" className={styles.btn} onClick={onLogout}>
      Log out
    </button>
  );
}
