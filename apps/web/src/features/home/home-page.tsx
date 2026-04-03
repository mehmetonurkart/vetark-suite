import styles from "./home-page.module.css";

const stack = [
  ["Frontend", "Next.js 16 + React 19"],
  ["Backend", "NestJS 11"],
  ["Database", "PostgreSQL 16"],
  ["Cache", "Redis 7"],
];

const conventions = [
  "Route files stay under app/, feature logic stays under src/features/.",
  "A future login flow should live in src/features/login on the frontend.",
  "The matching API work should live in src/modules/login on the backend.",
];

export function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>vetark-suite / web</p>
        <h1>Modern monorepo starter for the new frontend and backend split.</h1>
        <p className={styles.lead}>
          This screen is a project-specific placeholder. The default Turborepo demo
          was replaced so the repo starts with a clean, modular foundation.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <h2>Current stack</h2>
          <ul className={styles.list}>
            {stack.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.panel}>
          <h2>Folder rules</h2>
          <ul className={styles.rules}>
            {conventions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.panelWide}>
          <h2>Ready services</h2>
          <div className={styles.serviceRow}>
            <div>
              <span className={styles.label}>Web</span>
              <p>http://localhost:3000</p>
            </div>
            <div>
              <span className={styles.label}>API health</span>
              <p>http://localhost:4000/api/health</p>
            </div>
            <div>
              <span className={styles.label}>Infra</span>
              <p>PostgreSQL and Redis via Docker Compose</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
