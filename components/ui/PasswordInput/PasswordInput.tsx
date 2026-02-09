"use client";

import { useState } from "react";
import styles from "./PasswordInput.module.css";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function PasswordInput({
  label,
  error,
  className,
  id,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? props.name ?? undefined;

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={clsx(styles.wrap, error && styles.wrapError)}>
        <input
          id={inputId}
          className={clsx(styles.input, className)}
          type={visible ? "text" : "password"}
          {...props}
        />

        <button
          type="button"
          className={styles.eyeBtn}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          <svg className={styles.icon} aria-hidden="true">
            <use
              href={`/sprite.svg#${visible ? "icon-eye-off" : "icon-eye"}`}
            />
          </svg>
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
