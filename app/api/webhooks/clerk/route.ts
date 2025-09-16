import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const payload = await req.text();
  const headersList = headers();

  const svix_id = headersList.get("svix-id")!;
  const svix_timestamp = headersList.get("svix-timestamp")!;
  const svix_signature = headersList.get("svix-signature")!;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const email = data.email_addresses?.[0]?.email_address;

    if (!email) {
      console.log("⚠️ No email address found. Skipping DB save.");
      return new NextResponse("No email found", { status: 200 });
    }

    try {
      await prisma.user.create({
        data: {
          clerkId: data.id,
          email: email,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
      });

      console.log("✅ User successfully saved to the database.");
      return new NextResponse("User saved", { status: 200 });
    } catch (err) {
      console.error("❌ Error saving user to DB:", err);
      return new NextResponse("DB Error", { status: 500 });
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
