import { FC } from 'react'
import { getPostBySlug, getAllPosts } from '../../../utils/mdUtils'
import ReactMarkdown from 'react-markdown'

interface PostProps {
  params: {
    slug: string
  }
}

const Post: FC<PostProps> = async ({ params }) => {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <div>
        <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
        <p className="text-green-500">The requested post does not exist. Try hacking harder!</p>
      </div>
    )
  }

  return (
    <article className="prose prose-invert prose-green max-w-none">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-green-600 mb-8">{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default Post

