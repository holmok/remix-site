import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import PostsServer from '~/apis/posts.server'
import blogStyle from '~/styles/blog.css?url'

export function meta() {
  return [
    { title: 'Home' },
    {
      name: 'description',
      content: 'Welcome to home page with the latest blog posts.'
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
  const posts = PostsServer.getPosts({ start: 0, end: 4 })
  log.info({ count: posts.length }, 'Getting log posts for home page.')
  return { posts }
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  return (
    <>
      {posts.map((post) => (
        <div className='post'>
          <div className='header'>
            <h2>{post.title}</h2>
            <p className='date'>{post.date}</p>
          </div>
          <div
            className='body'
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
      ))}
      <div className='post-footer'>
        <a
          href='/blog'
          onClick={(e) => {
            e.preventDefault()
            navigate('/blog')
          }}
        >
          blog archive
        </a>
      </div>
    </>
  )
}
