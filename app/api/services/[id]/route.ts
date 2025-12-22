import { NextRequest, NextResponse } from 'next/server';
import { ServicesRepository } from '@/lib/db/repositories';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await ServicesRepository.getById(params.id);
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Service GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { service, features, technologies } = await request.json();
    
    const updatedService = await ServicesRepository.update(params.id, service, features, technologies);
    
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Service PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await ServicesRepository.delete(params.id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Service DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
