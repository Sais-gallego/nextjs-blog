import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithNotes } from "@/app/services/users"

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserWithNotes(Number(id))

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
      <p className="text-gray-500 mb-4">Username: {user.username}</p>
      <h3 className="text-xl font-semibold mb-2">Notes</h3>
      <ul className="space-y-2">
        {user.notes.map((note) => (
          <li key={note.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/notes/${note.id}`}
              className="text-blue-600 hover:underline"
            >
              {note.content}
            </Link>
            {note.important && (
              <strong className="ml-2 text-amber-600"> (important)</strong>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
