"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createNote } from "../../actions/notes"
import { useNotification } from "../../components/NotificationContext"
import FormField from "../../components/FormField"

const NewNote = () => {
  const [state, formAction] = useActionState(createNote, {
    error: "",
    success: false,
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("note created")
      router.push("/notes")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new note</h2>
      <form action={formAction} className="space-y-4">
        <FormField label="Content" name="content" />
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="important" className="rounded" />
            Important
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
        {state.error && <p className="text-red-600">{state.error}</p>}
      </form>
    </div>
  )
}

export default NewNote
