interface MessageFieldsProps {
  messages: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

function MessageFields({
  messages,
  onChange,
  onAdd,
  onRemove,
}: MessageFieldsProps) {
  return (
    <div>
      <h3>Messages</h3>

      {messages.map((message, index) => (
        <div key={index}>
          <textarea
            value={message}
            onChange={(e) =>
              onChange(index, e.target.value)
            }
            placeholder="Message"
          />

          {messages.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={onAdd}>
        Add Message
      </button>
    </div>
  );
}

export default MessageFields;