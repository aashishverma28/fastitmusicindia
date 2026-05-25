import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// PUT - update a job posting
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { title, department, location, type, experience, description, requirements, accentColor, isActive } = await req.json();

    const data: any = {};
    if (title !== undefined) data.title = title;
    if (department !== undefined) data.department = department;
    if (location !== undefined) data.location = location;
    if (type !== undefined) data.type = type;
    if (experience !== undefined) data.experience = experience;
    if (description !== undefined) data.description = description;
    if (requirements !== undefined) data.requirements = requirements;
    if (accentColor !== undefined) data.accentColor = accentColor;
    if (isActive !== undefined) data.isActive = isActive;

    const job = await prisma.job.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE - delete a job posting
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
