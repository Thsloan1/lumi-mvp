import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

// Schema validation
const logSchema = z.object({
  behavior: z.string().min(1),
  childId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { behavior, childId } = logSchema.parse(body);

    const log = await prisma.log.create({
      data: {
        behavior,
        childId,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error("Failed to create log:", error);
    return NextResponse.json({ error: "Invalid input or server error" }, { status: 400 });
  }
}
