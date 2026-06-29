import React from 'react';

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function CustomerDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Customer Management</h2>
      <p style={{ color: '#4b5563', marginTop: '4px' }}>
        Viewing data log profile parameters for ID: {id}
      </p>
    </div>
  );
}
