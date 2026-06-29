import React from 'react';

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Vehicle Profile Detail</h2>
      <p style={{ color: '#4b5563', marginTop: '4px' }}>
        Viewing data log parameters for Vehicle ID: {id}
      </p>
    </div>
  );
}
