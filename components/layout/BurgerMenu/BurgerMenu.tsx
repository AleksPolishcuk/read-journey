"use client";

import { useEffect } from "react";
import styles from "./BurgerMenu.module.css";
import { UserNav } from "../UserNav/UserNav";
import { LogoutButton } from "../LogoutButton/LogoutButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function BurgerMenu({ isOpen, onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <aside
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.top}>
          <button className={styles.closeBtn} type="button" onClick={onClose}>
            <svg width="28" height="28">
              <use href="/sprite.svg#icon-x" />
            </svg>
          </button>
        </div>

        <div className={styles.nav}>
          <UserNav onNavigate={onClose} />
        </div>

        <div className={styles.bottom}>
          <LogoutButton />
        </div>
      </aside>
    </div>
  );
}
