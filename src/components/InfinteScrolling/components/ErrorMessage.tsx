type Props = {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div style={{ padding: '16px', textAlign: 'center', color: '#d32f2f' }}>
      <p style={{ marginBottom: '12px' }}>{message}</p>
      <button
        onClick={onRetry}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          border: '1px solid #d32f2f',
          color: '#d32f2f',
          background: 'transparent',
        }}
      >
        Retry
      </button>
    </div>
  );
}