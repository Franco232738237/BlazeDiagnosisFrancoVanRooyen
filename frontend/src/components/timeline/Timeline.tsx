interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
}

export function Timeline({ items = [] }: { items?: TimelineItem[] }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map((item) => (
        <div key={item.id} style={{ borderLeft: '3px solid #d0d7de', paddingLeft: 12 }}>
          <strong>{item.title}</strong>
          {item.subtitle ? <div style={{ color: '#555' }}>{item.subtitle}</div> : null}
        </div>
      ))}
    </div>
  );
}
