import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

// GET - list all employees (admin only)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const employees = await prisma.user.findMany({
    where: { role: "EMPLOYEE" },
    include: { employeeProfile: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ employees });
}

// POST - create a new employee (admin only)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, fullName, department, jobTitle, phone, permissions, password } = await req.json();

  if (!email || !fullName || !department || !jobTitle || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const adminId = (session.user as any).id;

  const user = await prisma.user.create({
    data: {
      email,
      username: fullName,
      passwordHash: hashed,
      role: "EMPLOYEE",
      isActive: true,
      employeeProfile: {
        create: {
          fullName,
          department,
          jobTitle,
          phone: phone || null,
          permissions: permissions || "read",
          createdBy: adminId,
        },
      },
    },
    include: { employeeProfile: true },
  });

  return NextResponse.json({ success: true, user }, { status: 201 });
}
