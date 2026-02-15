import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

// GET /api/admin/programs - List all programs
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const programs = await prisma.program.findMany({
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

// POST /api/admin/programs - Create a new program
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, teacherName, description, startDate, endDate, price, paymentConditions, scheduleInfo, isActive, showApplyButton, isClassFull } = body;

    // Validation
    if (!title || !teacherName || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Title, teacher name, start date, and end date are required' },
        { status: 400 }
      );
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    const program = await prisma.program.create({
      data: {
        title,
        teacherName,
        description: description || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: price ? parseFloat(price) : null,
        paymentConditions: paymentConditions || null,
        scheduleInfo: scheduleInfo || null,
        isActive: isActive ?? true,
        showApplyButton: showApplyButton ?? true,
        isClassFull: isClassFull ?? false,
      },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
