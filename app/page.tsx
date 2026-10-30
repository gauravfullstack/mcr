import Link from "next/link";
import styles from "./page.module.css";

const features = [
  {
    name: "Tabs",
    description:
      "Build a reusable tabs component with different configurations.",
    href: "/tabs",
  },
  {
    name: "Autocomplete",
    description:
      "Create an accessible autocomplete component with different configurations.",
    href: "/autocomplete",
  },
  {
    name: "User Table",
    description:
      "Create a searchable user table with API integration.",
    href: "/usertable",
  },
  {
    name: "User List",
    description:
      "Fetch users and display loading, error, empty, and success states.",
    href: "/user-list",
  },
  {
    name: "Product Listing",
    description:
      "Search products, filter by category, and sort by price.",
    href: "/product-listing",
  },
  {
    name: "Infinite Scroll",
    description:
      "Load the next batch of users as you scroll to the bottom.",
    href: "/infinite-scroll",
  },
  {
    name: "Paginated Table",
    description:
      "Browse users with page size selection and previous/next controls.",
    href: "/paginated-table",
  },
  {
    name: "Modal",
    description:
      "Open a modal with focus trapping, Escape, and outside-click closing.",
    href: "/modal",
  },
  {
    name: "Searchable Dropdown",
    description:
      "Search and select an option from a dropdown that closes on outside click.",
    href: "/searchable-dropdown",
  },
  {
    name: "Toast Notifications",
    description:
      "Stack notifications that dismiss automatically after a short time.",
    href: "/toast-notifications",
  },
  {
    name: "Tooltip",
    description:
      "Position a tooltip above or below its target based on available space.",
    href: "/tooltip",
  },
  {
    name: "Sidebar Menu",
    description:
      "Expand and collapse nested items in a sidebar menu.",
    href: "/sidebar-menu",
  },
  {
    name: "Multi-step Form",
    description:
      "Create a multi-step form with next/back navigation, validation, conditional fields and submission.",
    href: "/checkoutform",
  },
  {
    name: "Dynamic Phone Fields",
    description:
      "Add and remove phone number fields in a form.",
    href: "/dynamic-phone-fields",
  },
  {
    name: "Login Form",
    description:
      "Validate login fields and disable submit while the request is in progress.",
    href: "/login",
  },
  {
    name: "File Upload",
    description:
      "Preview an image and display upload progress.",
    href: "/file-upload",
  },
  {
    name: "Shopping Cart",
    description:
      "Create a responsive shopping cart with add, edit, and remove functionality.",
    href: "/shoppingcart",
  },
  {
    name: "File Explorer",
    description:
      "Create an accessible file explorer component.",
    href: "/fileexplorer",
  },
  {
    name: "Nested Comments",
    description:
      "Create an accessible nested comments component.",
    href: "/nestedcomments",
  },
  {
    name: "Carousel Component",
    description:
      "Create an accessible carousel component.",
    href: "/carousel",
  },
  {
    name: "Kanban Board",
    description:
      "Create a draggable and sortable kanban board with columns and cards.",
    href: "/kanban",
  },
  {
    name: "WorkSpace",
    description:
      "Create a workspace component for managing multiple panels.",
    href: "/workspace",
  },
  {
    name: "Accordion",
    description:
      "Build single-open and multiple-open accordion panels.",
    href: "/accordion",
  },
  {
    name: "Counter",
    description:
      "Create a simple counter component with increment, decrement, and reset functionality.",
    href: "/counter",
  },
  {
    name: "Todo App",
    description:
      "Build a todo application with add, edit, delete, completion, and toast notifications.",
    href: "/todos",
  },
  {
    name: "Star Rating",
    description:
      "Create an accessible star rating component.",
    href: "/starrating",
  }

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