import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Blog Application</h1>
      <p className="text-gray-700">
        Welcome to the Full Stack Open Next.js Blog Application.
      </p>
      <div className="flex gap-4">
        <Link
          href="/blogs"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Blogs
        </Link>
      </div>
    </div>
  )
}
