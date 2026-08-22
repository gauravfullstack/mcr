import React from "react";
import styles from "./TodoInput.module.css";

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
    <div className={styles.container}>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />

      <button
        className={styles.button}
        onClick={onSubmit}
      >
        {isEditing ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default TodoInput;