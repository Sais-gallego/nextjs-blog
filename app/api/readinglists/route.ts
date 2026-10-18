import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/db"
import { readingLists, users } from "@/db/schema"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const { blogId } = await request.json()
  const [entry] = await db
    .insert(readingLists)
    .values({
      userId: dbUser.id,
      blogId: Number(blogId),
      read: false,
    })
    .returning()

  return NextResponse.json(entry, { status: 200 })
}
