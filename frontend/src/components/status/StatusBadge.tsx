export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 999,
        border: '1px solid #d0d7de',
        fontSize: 12,
        fontWeight: 600,
        background: '#f6f8fa',
      }}
    >
      {value}
    </span>
  );
}
