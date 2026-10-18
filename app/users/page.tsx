import Link from "next/link"
import { db } from "@/db"

export const dynamic = "force-dynamic"

export default async function UsersPage() {
  const allUsers = await db.query.users.findMany({
    with: { blogs: true },
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users</h2>
      <ul className="space-y-2">
        {allUsers.map((u) => (
          <li key={u.id} className="p-3 border rounded flex justify-between">
            <Link
              href={`/users/${u.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {u.name} ({u.username})
            </Link>
            <span>{u.blogs.length} blogs</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
