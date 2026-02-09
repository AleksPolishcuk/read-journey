import Image from "next/image";
import styles from "./AuthLayout.module.css";

type Props = {
  children: React.ReactNode;
  variant: "login" | "register";
};

export default function AuthShell({ children }: Props) {
  return (
    <div className={styles.page}>
      <section className={styles.shell} aria-label="Authentication">
        <div className={styles.brand}>
          <svg className={styles.brandIcon} aria-hidden="true">
            <use href="/sprite.svg#icon-Logo_small" />
          </svg>
          <span className={styles.brandText}>READ JOURNEY</span>
        </div>

        <h1 className={styles.title}>
          Expand your mind, reading <span className={styles.dim}>a book</span>
        </h1>

        <div className={styles.formArea}>{children}</div>
      </section>
      <div className={styles.imgSection}>
        <Image
          className={styles.img}
          width={255}
          height={350}
          src="/images/iPhone 15 Black phone.png"
          alt="Illustration of a person reading a book"
        />
      </div>
    </div>
  );
}
