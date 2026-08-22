export default function StylingComponent() {
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <h1 style={{ display: "flex", justifyContent: "center", color: "red" }}>
        Find Latest Videos Here Only
      </h1>

      <div
        style={{
          display: "flex",
          padding: "10px",
          gap: "8px",
          border: "1px solid black",
          backgroundColor: '#d9e3e3'
        }}
      >
        <div
          style={{
            width: "25%",
            border: "1px solid black",
          }}
        >
          This is left sidebar
        </div>

        <div
          style={{
            width: "25%",
            border: "1px solid black",
          }}
        >
          This is right main content
        </div>
      </div>
    </div>
  );
}
