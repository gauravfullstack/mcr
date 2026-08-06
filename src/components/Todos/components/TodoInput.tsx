import React from "react";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
};

const TodoInput: React.FC<Props> = ({
  input,
  setInput,
  onSubmit,
  isEditing,
}) => {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
        style={{ flex: 1, padding: "8px" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit()
          }
        }}
      />
      <button onClick={onSubmit}>
        {isEditing ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default TodoInput;