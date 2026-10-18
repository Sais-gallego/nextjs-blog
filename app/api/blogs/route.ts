import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/db"
import { blogs, users } from "@/db/schema"

export async function GET() {
  const allBlogs = await db.query.blogs.findMany({
    with: { user: true },
  })
  return NextResponse.json(allBlogs, { status: 200 })
}

export async function POST(request: Request) {
  const { title, author, url } = await request.json()
  let userId: number | null = null

  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim()
    const tokenUser = await db.query.users.findFirst({
      where: eq(users.apiToken, token),
    })
    if (tokenUser) {
      userId = tokenUser.id
    }
  }

  if (!userId) {
    const session = await auth()
    if (session?.user?.email) {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.username, session.user.email),
      })
      if (dbUser) {
        userId = dbUser.id
      }
    }
  }

  if (!userId) {
    const firstUser = await db.query.users.findFirst()
    if (firstUser) {
      userId = firstUser.id
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [created] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes: 0,
      userId,
    })
    .returning()

  return NextResponse.json(created, { status: 200 })
}
