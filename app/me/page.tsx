import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import MeClient from "./MeClient"

export const dynamic = "force-dynamic"

export default async function MePage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
    with: {
      readingLists: {
        with: {
          blog: true,
        },
      },
    },
  })

  if (!dbUser) {
    redirect("/login")
  }

  return (
    <MeClient
      user={{
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        apiToken: dbUser.apiToken,
      }}
      initialReadingList={dbUser.readingLists}
    />
  )
}
