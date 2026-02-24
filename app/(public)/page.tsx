import Link from "next/link";
import { PublicOnly } from "@/components/auth/PublicOnly/PublicOnly";
import { AuthCard } from "@/components/auth/AuthCard/AuthCard";
import { PhonePreview } from "@/components/auth/PhoneCard/PhoneCard";
import { OnlyMobileAndDesktop } from "@/components/common/Responsive/OnlyMobileAndDesktop";

import styles from "./welcome.module.css";

export default function WelcomePage() {
  return (
    <PublicOnly>
      <AuthCard>
        <section className={styles.panel}>
          <div className={styles.logoIcon} aria-label="ReadJourney">
            <svg width="42" height="18" aria-hidden="true">
              <use href="/sprite.svg#icon-Logo_small" />
            </svg>
          </div>

          {/* Tablet/Desktop full logo */}
          <div className={styles.logoFull} aria-label="ReadJourney">
            <svg width="182" height="20" aria-hidden="true">
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </div>

          <h1 className={styles.title}>
            Expand your mind, reading <br />
            <span className={styles.muted}>a book</span>
          </h1>

          <p className={styles.text}>
            Track your reading, build your library, and follow progress.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryBtn} href="/login">
              Log in
            </Link>

            <Link className={styles.secondaryBtn} href="/register">
              Registration
            </Link>
          </div>
        </section>

        <OnlyMobileAndDesktop>
          <PhonePreview />
        </OnlyMobileAndDesktop>
      </AuthCard>
    </PublicOnly>
  );
}
