import { NextResponse } from "next/server"
import crypto from "crypto"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function POST() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = crypto.randomBytes(24).toString("hex")
  await db
    .update(users)
    .set({ apiToken: token })
    .where(eq(users.username, session.user.email))

  return NextResponse.json({ token }, { status: 200 })
}
