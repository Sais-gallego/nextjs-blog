import { eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { users, notes } from "@/db/schema"

export const getUsers = async () => {
  return db.select().from(users)
}

export const getUserWithNotes = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { notes: true },
  })
}

export const getNotesByUserId = async (userId: number) => {
  return db.select().from(notes).where(eq(notes.userId, userId))
}

export const addNote = async (content: string, important: boolean) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (!user) {
    throw new Error("No users found")
  }

  await db.insert(notes).values({ content, important, userId: user.id })
}
