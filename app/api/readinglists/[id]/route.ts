import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { readingLists } from "@/db/schema"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const body = await request.json().catch(() => ({ read: true }))
  const readValue = body.read !== undefined ? Boolean(body.read) : true

  const [updated] = await db
    .update(readingLists)
    .set({ read: readValue })
    .where(eq(readingLists.id, Number(id)))
    .returning()

  return NextResponse.json(updated, { status: 200 })
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return PUT(request, context)
}
