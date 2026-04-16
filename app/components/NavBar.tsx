"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <Link href="/" className="hover:text-gray-300">
        home
      </Link>
      <Link href="/notes" className="hover:text-gray-300">
        notes
      </Link>
      <Link href="/users" className="hover:text-gray-300">
        users
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link href="/notes/new" className="hover:text-gray-300">
              create new
            </Link>
            <em className="text-gray-300">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut()}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-300">
              login
            </Link>
            <Link href="/register" className="hover:text-gray-300">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
