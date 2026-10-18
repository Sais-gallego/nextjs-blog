"use client"

import { useRouter } from "next/navigation"
import { useNotification } from "@/app/components/NotificationContext"
import FormField from "@/app/components/FormField"

export default function NewBlogPage() {
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const url = formData.get("url") as string

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, url }),
    })

    if (res.ok) {
      showNotification(`A new blog "${title}" by ${author} added`)
      router.push("/blogs")
      router.refresh()
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create new blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Title" name="title" required />
        <FormField label="Author" name="author" required />
        <FormField label="URL" name="url" required />
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  )
}
