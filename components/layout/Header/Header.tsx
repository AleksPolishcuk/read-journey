"use client";

import { useState } from "react";
import styles from "./Header.module.css";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { UserNav } from "../UserNav/UserNav";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { UserBar } from "../UserBar/UserBar";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        {/* LEFT */}
        <div className={styles.left}>
          {/* Mobile icon-only */}
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
        </div>

        {/* CENTER (tablet+desktop) */}
        <div className={styles.center}>
          <UserNav variant="inline" />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* tablet: only avatar; desktop: avatar + name */}
          <div className={styles.userTablet}>
            <UserBar variant="compact" />
          </div>

          <div className={styles.userDesktop}>
            <UserBar variant="full" />
          </div>

          <div className={styles.logoutInline}>
            <LogoutButton />
          </div>

          {/* mobile only */}
          <button
            className={styles.burgerBtn}
            type="button"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
          >
            <svg width="28" height="28" aria-hidden="true">
              <use href="/sprite.svg#icon-menu-04" />
            </svg>
          </button>
        </div>
      </header>

      <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
