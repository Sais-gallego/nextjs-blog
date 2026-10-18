"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddToReadingListButton({ blogId }: { blogId: number }) {
  const [added, setAdded] = useState(false)
  const router = useRouter()

  const handleAdd = async () => {
    const res = await fetch("/api/readinglists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId }),
    })
    if (res.ok) {
      setAdded(true)
      router.refresh()
    }
  }

  return (
    <button
      type="button"
      data-testid="add-to-reading-list-button"
      onClick={handleAdd}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      {added ? "Added to reading list" : "Add to reading list"}
    </button>
  )
}
