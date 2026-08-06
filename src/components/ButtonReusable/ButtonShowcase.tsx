import Button from "./components/Button";

export default function ButtonShowcase() {
  return (
    <div style={{ padding: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <Button>Primary</Button>

      <Button variant="secondary">
        Secondary
      </Button>

      <Button variant="danger">
        Delete
      </Button>

      <Button size="lg">
        Large
      </Button>

      <Button loading>
        Saving...
      </Button>

      <Button onClick={() => alert("Clicked!")}>
        Click Me
      </Button>

      <Button disabled>
        Disabled
      </Button>
    </div>
  );
}
