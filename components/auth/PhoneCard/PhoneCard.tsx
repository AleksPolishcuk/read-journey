import Image from "next/image";
import styles from "./PhoneCard.module.css";

export function PhonePreview() {
  return (
    <section className={styles.card}>
      <div className={styles.media}>
        <Image
          src="/images/iPhone 15 Black phone@2x.png"
          alt="App preview"
          width={225}
          height={315}
          priority
          className={styles.img}
        />
      </div>
    </section>
  );
}
