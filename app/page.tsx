import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    name: "Todo App",
    description:
      "Build a todo application with add, edit, delete and filter functionality.",
    href: "/todos",
  },
  {
    name: "Reusable Button",
    description:
      "Create a reusable button component with different variants and states.",
    href: "/button",
  },
  {
    name: "Checkout Form",
    description:
      "Create a responsive checkout form with validation.",
    href: "/checkoutform",
  },
  {
    name: "Debounce Input",
    description:
      "Create a debounced input component for improved performance.",
    href: "/debounce",
  },
  {
    name: "Kanban Board",
    description:
      "Create a draggable and sortable kanban board with columns and cards.",
    href: "/kanban",
  },
  {
    name: "Shopping Cart",
    description:
      "Create a responsive shopping cart with add, edit, and remove functionality.",
    href: "/shoppingcart",
  },
  {
    name: "Styling with basic CSS",
    description:
      "Learn to style components using basic CSS techniques.",
    href: "/styling",
  },
  {
    name: "User Table",
    description:
      "Create a searchable user table with API integration.",
    href: "/usertable",
  },
  {
    name: "Infinite Scroll",
    description:
      "Load more content automatically as the user scrolls.",
    href: "/infinitescrolling",
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
  {
    name: "Tabs",
    description:
      "Build a reusable tabs component with different configurations.",
    href: "/tabs",
  },
  {
    name: "Dropdown",
    description:
      "Create an accessible dropdown component with different configurations.",
    href: "/dropdown",
  },
  {
    name: "Autocomplete",
    description:
      "Create an accessible autocomplete component with different configurations.",
    href: "/autocomplete",
  },
   {
    name: "File Upload",
    description:
      "Create an accessible file upload component with preview and validation.",
    href: "/fileupload",
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