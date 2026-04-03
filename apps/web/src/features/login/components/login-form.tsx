"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";
import { loginWithCredentials } from "../api/session-client";
import { LockIcon, UserIcon } from "./login-icons";
import styles from "../login-page.module.css";

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      await loginWithCredentials({
        username,
        password,
      });

      startTransition(() => {
        router.replace("/");
        router.refresh();
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Giriş işlemi başarısız oldu.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.srOnly} htmlFor="username">
        Kullanıcı adı
      </label>
      <div className={styles.inputShell}>
        <span className={styles.inputIcon}>
          <UserIcon />
        </span>
        <input
          autoComplete="username"
          id="username"
          name="username"
          placeholder="Kullanıcı Adı"
          required
          type="text"
        />
      </div>

      <label className={styles.srOnly} htmlFor="password">
        Şifre
      </label>
      <div className={styles.inputShell}>
        <span className={styles.inputIcon}>
          <LockIcon />
        </span>
        <input
          autoComplete="current-password"
          id="password"
          name="password"
          placeholder="Şifre"
          required
          type="password"
        />
      </div>

      {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

      <button
        className={styles.submitButton}
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
