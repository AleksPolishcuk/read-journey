"use client";

import React from "react";
import styles from "./Input.module.css";

type Props = {
  label: string;
  type?: "text" | "email" | "password";
  error?: string;
  showToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  type = "text",
  error,
  showToggle,
  isPasswordVisible,
  onTogglePassword,
  ...rest
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.control} ${error ? styles.errorBorder : ""}`}>
        <span className={styles.label}>{label}:</span>

        <input className={styles.input} type={type} {...rest} />

        {showToggle && (
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onTogglePassword}
          >
            <svg width="20" height="20">
              <use
                href={`/sprite.svg#${isPasswordVisible ? "icon-eye" : "icon-eye-off"}`}
              />
            </svg>
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
