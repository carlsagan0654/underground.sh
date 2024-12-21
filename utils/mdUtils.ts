import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts() {
  console.log('Searching for posts in directory:', postsDirectory)
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error('Posts directory does not exist:', postsDirectory)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    console.log('Found files:', fileNames)
    
    if (fileNames.length === 0) {
      console.warn('No files found in posts directory')
      return []
    }

    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        console.log('Processing file:', fileName)
        console.log('Frontmatter:', data)

        if (!data.title || !data.date) {
          console.warn(`Missing title or date in frontmatter for file: ${fileName}`)
        }

        return {
          slug,
          ...(data as { title: string; date: string }),
          excerpt: content.slice(0, 200) + '...',
        }
      })

    console.log('All posts data:', allPostsData)
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    console.log('Attempting to read file:', fullPath)
    
    if (!fs.existsSync(fullPath)) {
      console.error(`File does not exist: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    console.log('Post data:', data)
    console.log('Post content preview:', content.slice(0, 100) + '...')

    if (!data.title || !data.date) {
      console.warn(`Missing title or date in frontmatter for file: ${slug}.md`)
    }

    return {
      slug,
      ...(data as { title: string; date: string }),
      content,
    }
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error)
    return null
  }
}

