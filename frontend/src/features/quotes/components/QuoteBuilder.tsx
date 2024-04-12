import { StatusBadge } from '../../../components/status/StatusBadge';

const demoQuote = {
  version: 1,
  status: 'SENT',
  subtotal: 1950,
  taxAmount: 292.5,
  discountAmount: 0,
  total: 2242.5,
  lines: [
    { id: '1', type: 'LABOR', description: 'Minor service labor', quantity: 1, unitPrice: 850, total: 850 },
    { id: '2', type: 'PART', description: 'Front brake pads', quantity: 1, unitPrice: 1100, total: 1100 },
  ],
};

export function QuoteBuilder() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Quote v{demoQuote.version}</h3>
        <StatusBadge value={demoQuote.status} />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {demoQuote.lines.map((line) => (
          <div key={line.id} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 90px', gap: 8 }}>
            <span>{line.description}</span>
            <span>{line.quantity}</span>
            <span>{line.unitPrice.toFixed(2)}</span>
            <strong>{line.total.toFixed(2)}</strong>
          </div>
        ))}
      </div>
      <hr style={{ margin: '16px 0' }} />
      <div style={{ display: 'grid', gap: 4, justifyContent: 'end' }}>
        <span>Subtotal: {demoQuote.subtotal.toFixed(2)}</span>
        <span>Tax: {demoQuote.taxAmount.toFixed(2)}</span>
        <strong>Total: {demoQuote.total.toFixed(2)}</strong>
      </div>
    </div>
  );
}
