import Link from 'next/link'
import { getAllPosts } from '../utils/mdUtils'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default async function Home() {
  const posts = getAllPosts()

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Latest Hacks</h1>
      {posts && posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug} className="bg-gray-900 border-green-500 hover:border-green-400 transition-colors">
              <CardHeader>
                <CardTitle>
                  <Link href={`/posts/${post.slug}`} className="text-green-400 hover:text-green-300">
                    {post.title || 'Untitled Post'}
                  </Link>
                </CardTitle>
                <CardDescription className="text-green-600">{post.date || 'No date'}</CardDescription>
              </CardHeader>
              <CardDescription className="px-6 pb-6">{post.excerpt || 'No excerpt available'}</CardDescription>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-green-500">No posts found. Hack harder!</p>
      )}
    </div>
  )
}

