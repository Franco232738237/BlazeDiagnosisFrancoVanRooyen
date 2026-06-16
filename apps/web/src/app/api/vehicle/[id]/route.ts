import { listVehiclesForCustomer } from '@/features/vehicles/services/vehicle.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Get the tenantId from the URL query string
  const { id } = await params;
  const tenantId = request.nextUrl.searchParams.get('tenantId');

  // Validate that the tenantId is provided
  if (!tenantId) 
  {
    return NextResponse.json(
      { error: 'Missing required tenantId parameter' },
      { status: 400 },
    );
  }

  //Added try-catch block to handle potential errors when fetching vehicles for the customer.

try {
    const DB= await listVehiclesForCustomer(tenantId, id)
    return NextResponse.json(DB)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vehicles for the customer' },
      { status: 500 },
    );
  }
}
