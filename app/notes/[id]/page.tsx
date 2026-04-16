import { notFound } from "next/navigation"
import { getNoteById } from "@/app/services/notes"
import { toggleNoteImportance } from "@/app/actions/notes"

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const note = await getNoteById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">{note.content}</h2>
      <p
        className={`mb-4 ${note.important ? "text-amber-600 font-semibold" : "text-gray-500"}`}
      >
        {note.important ? "Important" : "Not important"}
      </p>
      <form action={toggleNoteImportance}>
        <input type="hidden" name="id" value={note.id} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {note.important ? "Mark as not important" : "Mark as important"}
        </button>
      </form>
    </div>
  )
}

export default NotePage
