"use client"

import { useState } from "react"
import Link from "next/link"

type BlogItem = {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

export default function BlogsClient({ initialBlogs }: { initialBlogs: BlogItem[] }) {
  const [filterInput, setFilterInput] = useState("")
  const [appliedFilter, setAppliedFilter] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setAppliedFilter(filterInput)
  }

  const filteredBlogs = initialBlogs.filter((blog) => {
    if (!appliedFilter.trim()) return true
    const q = appliedFilter.toLowerCase()
    return (
      blog.title.toLowerCase().includes(q) ||
      blog.author.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <Link
          href="/blogs/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create new blog
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          data-testid="filter-input"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Filter blogs..."
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Search
        </button>
      </form>

      <div data-testid="blogs-list" className="space-y-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 border border-gray-200 rounded shadow-sm flex items-center justify-between"
          >
            <div>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-600">by {blog.author}</p>
            </div>
            <span className="text-sm text-gray-700">{blog.likes} likes</span>
          </div>
        ))}
      </div>
    </div>
  )
}
