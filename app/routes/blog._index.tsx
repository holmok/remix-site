import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import blogStyle from '~/styles/blog.css?url'
import PostsService from '~/apis/posts.server'

export function meta() {
  return [
    { title: 'Blog Archive' },
    {
      name: 'description',
      content: 'The blog archive page, a list of all blogs.'
    }
  ]
}

export function links() {
  return [{ rel: 'stylesheet', href: blogStyle }]
}

export async function loader(args: LoaderFunctionArgs) {
  const {
    context: { log }
  } = args
  const posts = PostsService.getAllPosts()
  log.info({ count: posts.length }, 'Getting log posts for archive page.')
  return { posts }
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>Blog Archive</h1>
      <div className='posts'>
        {posts.map((post) => (
          <div key={post.title} className='post-link'>
            <span className='title'>
              <a href={`/blog/${post.stub}`}>{post.title}</a>
            </span>
            <span className='date'>{post.date}</span>
          </div>
        ))}
      </div>
    </>
  )
}
