import styles from "./Container.module.css";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}
