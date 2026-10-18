import { NextResponse } from "next/server"
import { db } from "@/db"
import { readingLists, blogs, users } from "@/db/schema"

export async function DELETE() {
  await db.delete(readingLists)
  await db.delete(blogs)
  await db.delete(users)
  return NextResponse.json({ ok: true }, { status: 200 })
}
