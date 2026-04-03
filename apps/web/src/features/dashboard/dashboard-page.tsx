"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutSession } from "../login/api/session-client";
import type { SessionUser } from "../login/types/session-user";
import styles from "./dashboard-page.module.css";

const stats = [
  { label: "Toplam kayit", value: "2.500", trend: "+4%", accent: "green" },
  { label: "Bugun islemler", value: "128", trend: "+12%", accent: "blue" },
  { label: "Asi takibi", value: "42", trend: "-3%", accent: "amber" },
  { label: "Aktif hatirlatici", value: "73", trend: "+9%", accent: "green" },
  { label: "Aylik gelir", value: "186K", trend: "+18%", accent: "blue" },
  { label: "Yeni musteri", value: "17", trend: "+6%", accent: "amber" },
];

const species = [
  { name: "Kedi", value: "42%", image: "/species/cat.png" },
  { name: "Kopek", value: "33%", image: "/species/dog.png" },
  { name: "Kus", value: "14%", image: "/species/bird.png" },
  { name: "Diger", value: "11%", image: "/species/other.png" },
];

const reminders = [
  {
    title: "Karma asi tekrari",
    detail: "3 hasta bugun tekrar listesine dusuyor.",
    time: "09:30",
  },
  {
    title: "Kontrol ziyareti",
    detail: "Operasyon sonrasi rutin kontrol.",
    time: "12:15",
  },
  {
    title: "Mikrocip kaydi",
    detail: "Yeni kabul edilen hasta icin kayit tamamlama.",
    time: "16:00",
  },
];

const quickLinks = [
  "Yeni hasta kaydi",
  "Asi takvimi",
  "Musteri listesi",
  "Klinik notlari",
  "Randevu plani",
  "Rapor ekranlari",
];

interface DashboardPageProps {
  user: SessionUser;
}

export function DashboardPage({ user }: DashboardPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    await logoutSession();

    startTransition(() => {
      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <div className={styles.brandIcon}>VA</div>
          <div>
            <p className={styles.brandTitle}>VetArk</p>
            <span className={styles.brandCaption}>
              Veteriner yonetim paneli
            </span>
          </div>
        </div>

        <div className={styles.profileCard}>
          <Image
            alt="Profil gorseli"
            className={styles.profileImage}
            height={72}
            src="/brand/profile.jpg"
            width={72}
          />
          <div>
            <span>Hos geldiniz</span>
            <strong>{user.displayName}</strong>
          </div>
        </div>

        <nav className={styles.menu}>
          <Link className={styles.menuItemActive} href="/">
            Anasayfa
          </Link>
          <a className={styles.menuItem} href="#">
            Musteriler
          </a>
          <a className={styles.menuItem} href="#">
            Hatirlaticilar
          </a>
          <a className={styles.menuItem} href="#">
            Klinik notlari
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.logoutButton}
            disabled={isPending}
            onClick={handleLogout}
            type="button"
          >
            {isPending ? "Cikis yapiliyor..." : "Cikis Yap"}
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className={styles.topBarLabel}>Vetark Suite / Dashboard</p>
            <h1>Eski surumden ilham alan yeni anasayfa</h1>
          </div>
          <div className={styles.topBarUser}>
            <span>{user.username}</span>
            <strong>{user.role}</strong>
          </div>
        </header>

        <section className={styles.tiles}>
          {stats.map((item) => (
            <article
              key={item.label}
              className={`${styles.tile} ${styles[item.accent]}`}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.trend} gecen haftaya gore</small>
            </article>
          ))}
        </section>

        <section className={styles.heroRow}>
          <article className={styles.heroPanel}>
            <div className={styles.heroPanelHeader}>
              <div>
                <span className={styles.panelEyebrow}>Gunluk ozet</span>
                <h2>Klinik operasyonlarini tek ekrandan izle.</h2>
              </div>
              <div className={styles.statusBadge}>Sistem aktif</div>
            </div>

            <div className={styles.progressGroup}>
              <div>
                <span>Hasta akis hizi</span>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFillStrong} />
                </div>
              </div>
              <div>
                <span>Randevu doluluk</span>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFillMedium} />
                </div>
              </div>
              <div>
                <span>Hatirlatici kapatma orani</span>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFillLight} />
                </div>
              </div>
            </div>
          </article>

          <article className={styles.sidePanel}>
            <span className={styles.panelEyebrow}>Tur dagilimi</span>
            <h2>Bugunku hasta turleri</h2>
            <div className={styles.speciesGrid}>
              {species.map((item) => (
                <div key={item.name} className={styles.speciesCard}>
                  <Image
                    alt={item.name}
                    height={42}
                    src={item.image}
                    width={42}
                  />
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.contentGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.panelEyebrow}>Bugunku liste</span>
                <h2>Yaklasan uygulamalar</h2>
              </div>
            </div>

            <div className={styles.reminderList}>
              {reminders.map((item) => (
                <div key={item.title} className={styles.reminderItem}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.panelEyebrow}>Hizli erisim</span>
                <h2>Panel kisayollari</h2>
              </div>
            </div>

            <div className={styles.quickGrid}>
              {quickLinks.map((item) => (
                <button key={item} className={styles.quickCard} type="button">
                  {item}
                </button>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
