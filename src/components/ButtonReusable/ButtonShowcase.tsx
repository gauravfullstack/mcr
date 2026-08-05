import Button from "./components/Button";
import { Heart, Save, Trash2, Check } from "lucide-react"; // Icons library

export default function ButtonShowcase() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px" }}>
      <h1>Button Component Showcase</h1>

      {/* ===== BASIC USAGE ===== */}
      <section>
        <h2>Basic Buttons</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="success">Success</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>

      {/* ===== SIZES ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>Sizes</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </section>

      {/* ===== WITH ICONS ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>With Icons</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button icon={<Save size={20} />}>Save</Button>
          <Button icon={<Save size={20} />} iconPosition="right">
            Save
          </Button>
          <Button icon={<Trash2 size={20} />} variant="danger">
            Delete
          </Button>
          <Button icon={<Check size={20} />} variant="success">
            Confirm
          </Button>
          {/* Icon only */}
          <Button icon={<Heart size={20} />} ariaLabel="Like" />
        </div>
      </section>

      {/* ===== DISABLED STATE ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>States</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button disabled>Disabled</Button>
          <Button variant="danger" disabled>
            Disabled Danger
          </Button>
        </div>
      </section>

      {/* ===== LOADING STATE ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>Loading State</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button loading>Submitting...</Button>
          <Button loading variant="danger">
            Deleting...
          </Button>
          <Button loading size="large">
            Processing
          </Button>
        </div>
      </section>

      {/* ===== WITH CLICK HANDLER ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>Interactive</h2>
        <Button onClick={() => alert("Clicked!")} variant="primary">
          Click Me
        </Button>
      </section>

      {/* ===== FORM USAGE ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>In Forms</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted!");
          }}
        >
          <input placeholder="Enter name" style={{ padding: "8px", marginRight: "10px" }} />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </section>

      {/* ===== WITH TITLE/TOOLTIP ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>With Tooltip</h2>
        <Button title="Save your changes">Save (Hover me)</Button>
      </section>

      {/* ===== CUSTOM CLASSES ===== */}
      <section style={{ marginTop: "30px" }}>
        <h2>Custom Styling</h2>
        <Button className="custom-button">
          Custom Styled
        </Button>
      </section>
    </div>
  );
}