"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { LoginForm } from "./components/login-form";
import { KeyIcon, MoonIcon, SunIcon } from "./components/login-icons";
import styles from "./login-page.module.css";

const pawItems = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  left: `${(index * 11 + 7) % 100}%`,
  delay: `${(index % 8) * 0.9}s`,
  duration: `${12 + (index % 6) * 1.7}s`,
  drift: `${(index % 5) * 12 - 18}px`,
  rotate: `${(index % 6) * 58}deg`,
  opacity: `${0.34 + (index % 4) * 0.08}`,
  size: `${24 + (index % 5) * 10}px`,
}));

export function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("vetark-login-theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  function toggleTheme() {
    setDarkMode((current) => {
      const nextTheme = !current;

      window.localStorage.setItem(
        "vetark-login-theme",
        nextTheme ? "dark" : "light",
      );

      return nextTheme;
    });
  }

  return (
    <main className={`${styles.page} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.pawField} aria-hidden="true">
        {pawItems.map((paw) => (
          <span
            key={paw.id}
            className={styles.paw}
            style={
              {
                "--paw-left": paw.left,
                "--paw-delay": paw.delay,
                "--paw-duration": paw.duration,
                "--paw-drift": paw.drift,
                "--paw-rotate": paw.rotate,
                "--paw-opacity": paw.opacity,
                "--paw-size": paw.size,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <section className={styles.card}>
        <button
          aria-label={darkMode ? "Açık temaya geç" : "Koyu temaya geç"}
          className={styles.themeToggle}
          onClick={toggleTheme}
          type="button"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className={styles.brand}>
          <Image
            alt="VetArk logosu"
            className={styles.brandImage}
            height={85}
            priority
            src="/brand/vetark-login.jpg"
            width={85}
          />
          <div className={styles.brandText}>
            <p className={styles.brandName}>VetArk</p>
          </div>
        </div>

        <h1 className={styles.title}>Veteriner Yönetim Paneli</h1>

        <LoginForm />

        <footer className={styles.footer}>
          <span>
            © 2026 <strong>VetArk</strong> | Veteriner Yönetim Sistemi
          </span>
          <button className={styles.forgotLink} type="button">
            <KeyIcon className={styles.footerIcon} />
            Şifremi unuttum
          </button>
        </footer>
      </section>
    </main>
  );
}
