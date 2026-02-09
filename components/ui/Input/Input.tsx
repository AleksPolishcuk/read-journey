import styles from "./Input.module.css";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: Props) {
  const inputId = id ?? props.name ?? undefined;

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={clsx(styles.input, error && styles.inputError, className)}
        {...props}
      />

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
