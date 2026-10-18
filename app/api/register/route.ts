import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function POST(request: Request) {
  const { username, name, password } = await request.json()

  if (!username || username.trim().length < 4) {
    return NextResponse.json(
      { error: "Username must be at least 4 characters" },
      { status: 400 },
    )
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.username, username.trim()),
  })
  if (existing) {
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 400 },
    )
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const [created] = await db
    .insert(users)
    .values({
      username: username.trim(),
      name: (name || username).trim(),
      passwordHash,
    })
    .returning()

  return NextResponse.json(
    { id: created.id, username: created.username, name: created.name },
    { status: 200 },
  )
}
