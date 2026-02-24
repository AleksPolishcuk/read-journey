import styles from "./AuthHeading.module.css";

export function AuthHeading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        {/* mobile logo */}
        <svg className={styles.logoMobile} width="48" height="18">
          <use href="/sprite.svg#icon-Logo_small" />
        </svg>

        <svg className={styles.logoDesktop} width="182" height="17">
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </div>

      <h1 className={styles.title}>
        Expand your mind, reading <br />
        <span className={styles.muted}>a book</span>
      </h1>
    </div>
  );
}
