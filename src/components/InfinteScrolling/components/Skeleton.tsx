const SkeletonItem = () => (
  <div style={{
    padding: '16px',
    marginBottom: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    background: '#fff',
  }}>
    <div style={{
      height: '16px',
      width: '40%',
      background: '#e0e0e0',
      borderRadius: '4px',
      marginBottom: '10px',
      animation: 'pulse 1.5s infinite',
    }} />
    <div style={{
      height: '14px',
      width: '80%',
      background: '#e0e0e0',
      borderRadius: '4px',
      animation: 'pulse 1.5s infinite',
    }} />
    <style>{`
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.4; }
        100% { opacity: 1; }
      }
    `}</style>
  </div>
);

export default function Skeleton() {
  return (
    <>
      {[1, 2, 3].map(i => <SkeletonItem key={i} />)}
    </>
  );
}