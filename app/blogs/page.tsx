import { db } from "@/db"
import BlogsClient from "./BlogsClient"

export const dynamic = "force-dynamic"

export default async function BlogsPage() {
  const allBlogs = await db.query.blogs.findMany()

  return <BlogsClient initialBlogs={allBlogs} />
}
