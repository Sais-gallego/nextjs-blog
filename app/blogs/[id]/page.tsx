import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"
import AddToReadingListButton from "./AddToReadingListButton"

export const dynamic = "force-dynamic"

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, Number(id)),
    with: { user: true },
  })

  if (!blog) {
    notFound()
  }

  return (
    <div data-testid="blog-detail" className="p-6 border rounded shadow-sm space-y-2">
      <h2 data-testid="blog-title" className="text-2xl font-bold">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-gray-700">
        Author: {blog.author}
      </p>
      <p>
        URL:{" "}
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
      <p>{blog.likes} likes</p>
      <AddToReadingListButton blogId={blog.id} />
    </div>
  )
}
