import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const dynamic = "force-dynamic"

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await db.query.users.findFirst({
    where: eq(users.id, Number(id)),
    with: { blogs: true },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <h3 className="text-lg font-semibold">Added blogs</h3>
      <ul className="list-disc pl-6">
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}
