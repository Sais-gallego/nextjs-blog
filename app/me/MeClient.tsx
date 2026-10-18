"use client"

import { useState } from "react"
import Link from "next/link"

type ReadingListItem = {
  id: number
  read: boolean
  blog: {
    id: number
    title: string
    author: string
    url: string
  }
}

type MeProps = {
  user: {
    id: number
    name: string
    username: string
    apiToken: string | null
  }
  initialReadingList: ReadingListItem[]
}

export default function MeClient({ user, initialReadingList }: MeProps) {
  const [readingList, setReadingList] = useState<ReadingListItem[]>(initialReadingList)
  const [token, setToken] = useState<string | null>(user.apiToken)

  const handleMarkRead = async (entryId: number) => {
    const res = await fetch(`/api/readinglists/${entryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    })
    if (res.ok) {
      setReadingList((prev) =>
        prev.map((item) => (item.id === entryId ? { ...item, read: true } : item)),
      )
    }
  }

  const handleGenerateToken = async () => {
    const res = await fetch("/api/me/token", {
      method: "POST",
    })
    if (res.ok) {
      const data = await res.json()
      setToken(data.token)
    }
  }

  const unreadBlogs = readingList.filter((item) => !item.read)
  const readBlogs = readingList.filter((item) => item.read)

  return (
    <div className="space-y-8 p-4">
      <div data-testid="user-profile" className="border p-4 rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-2">User Profile</h2>
        <p data-testid="user-name" className="text-lg">
          Name: {user.name}
        </p>
        <p data-testid="user-username" className="text-gray-700">
          Username: {user.username}
        </p>
      </div>

      <div data-testid="reading-list-section" className="border p-4 rounded shadow-sm space-y-4">
        <h3 className="text-xl font-bold">Reading List</h3>
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-gray-500">
            Your reading list is empty.
          </p>
        ) : (
          <>
            <div data-testid="unread-section" className="space-y-2">
              <h4 className="font-semibold">Unread Blogs</h4>
              {unreadBlogs.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-gray-500">
                  No unread blogs.
                </p>
              ) : (
                unreadBlogs.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <Link
                      href={`/blogs/${item.blog.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.blog.title}
                    </Link>
                    <button
                      type="button"
                      data-testid={`mark-read-${item.id}`}
                      onClick={() => handleMarkRead(item.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Mark as read
                    </button>
                  </div>
                ))
              )}
            </div>

            {readBlogs.length > 0 && (
              <div data-testid="read-section" className="space-y-2 mt-4">
                <h4 className="font-semibold">Read Blogs</h4>
                {readBlogs.map((item) => (
                  <div key={item.id} className="p-2 border rounded text-gray-600">
                    {item.blog.title}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div data-testid="api-token-section" className="border p-4 rounded shadow-sm space-y-3">
        <h3 className="text-xl font-bold">API Token</h3>
        {!token ? (
          <p data-testid="no-token-message" className="text-gray-500">
            No API token generated yet.
          </p>
        ) : (
          <div data-testid="token-display" className="p-2 bg-gray-100 rounded">
            <code data-testid="api-token" className="break-all">
              {token}
            </code>
          </div>
        )}
        <button
          type="button"
          data-testid="generate-token-button"
          onClick={handleGenerateToken}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {token ? "Regenerate API Token" : "Generate API Token"}
        </button>
      </div>
    </div>
  )
}
