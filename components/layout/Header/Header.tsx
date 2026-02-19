"use client";

import { useState } from "react";
import styles from "./Header.module.css";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="42" height="18" aria-hidden="true">
            <use href="/sprite.svg#icon-Logo_small" />
          </svg>
        </div>

        <div className={styles.actions}>
          <button className={styles.userBtn} type="button" aria-label="User">
            <span className={styles.userDot} />
          </button>

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
