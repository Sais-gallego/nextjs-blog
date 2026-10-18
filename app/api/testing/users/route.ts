import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function POST(request: Request) {
  const { username, name, password } = await request.json()
  const passwordHash = await bcrypt.hash(password, 10)
  const [created] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning()

  return NextResponse.json(
    { id: created.id, username: created.username, name: created.name },
    { status: 201 },
  )
}
