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
        <div className={styles.left}>
          <div className={styles.logo} aria-label="ReadJourney">
            <svg width="42" height="18" aria-hidden="true">
              <use href="/sprite.svg#icon-Logo_small" />
            </svg>
          </div>

          <div className={styles.navInline}>
            <UserNav />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.userFull}>
            <UserBar variant="full" />
          </div>

          <div className={styles.userCompact}>
            <UserBar variant="compact" />
          </div>

          <div className={styles.logoutInline}>
            <LogoutButton />
          </div>

          <button
            className={styles.burgerBtn}
            type="button"
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
          >
            <svg width="28" height="28">
              <use href="/sprite.svg#icon-menu-04" />
            </svg>
          </button>
        </div>
      </header>

      <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
