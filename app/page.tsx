import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    name: "Todo App",
    description:
      "Build a todo application with add, edit, delete and filter functionality.",
    href: "/todo",
  },
  {
    name: "Autocomplete",
    description:
      "Create a searchable autocomplete input with API integration.",
    href: "/autocomplete",
  },
  {
    name: "Pagination",
    description:
      "Implement client-side and server-side pagination patterns.",
    href: "/pagination",
  },
  {
    name: "Infinite Scroll",
    description:
      "Load more content automatically as the user scrolls.",
    href: "/infinite-scroll",
  },
  {
    name: "Modal",
    description:
      "Build a reusable modal component with different configurations.",
    href: "/modal",
  },
  {
    name: "Accordion",
    description:
      "Create an accessible accordion with expandable sections.",
    href: "/accordion",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Machine Coding Round</h1>
          <p>Practice common frontend machine coding problems.</p>
        </header>

        <section className={styles.grid}>
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className={styles.card}
            >
              <h2>{feature.name}</h2>

              <p>{feature.description}</p>

              <span>Open feature →</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}