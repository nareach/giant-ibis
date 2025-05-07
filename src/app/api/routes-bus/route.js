import { NextResponse } from 'next/server';
import { validateRoute } from '../../../api-helper/validator-util';
import { routeService } from '../service/route.service';

export async function GET(request) {

  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const travelDate = searchParams.get('travelDate');

  const validator = await validateRoute({ origin, destination, travelDate });

  if (validator != true) {
    return validator;
  }

  const routes = await routeService.findRouteDetail({
    travelDate: travelDate,
    destination: destination,
    origin: origin,
  });

  return NextResponse.json({
    message: "Find route success.",
    data: routes
  });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ message: 'POST request', data: body });
}

export async function PUT() {
  return NextResponse.json({ message: 'PUT request' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'DELETE request' });
}