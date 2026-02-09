import styles from "./Button.module.css";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export default function Button({ className, fullWidth, ...props }: Props) {
  return (
    <button
      className={clsx(styles.btn, fullWidth && styles.fullWidth, className)}
      {...props}
    />
  );
}
