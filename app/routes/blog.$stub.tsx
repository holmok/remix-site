import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import PostsServer from '~/apis/posts.server'

import blogStyle from '~/styles/blog.css?url'

export function links() {
  return [{ rel: 'stylesheet', href: blogStyle }]
}

export function meta({ data }: { data: ReturnType<typeof loader> }) {
  return [
    { title: data.post?.title ?? 'Post not found' },
    { name: 'description', content: 'The blog archive entry.' }
  ]
}

export function loader(args: LoaderFunctionArgs) {
  const {
    params: { stub },
    context: { log }
  } = args
  if (!stub) {
    log.warn('No slug provided for blog post.')
    return { post: null, prev: null, next: null }
  } else {
    const data = {
      post: PostsServer.getPostBySlug(stub),
      prev: PostsServer.getPrevPost(stub),
      next: PostsServer.getNextPost(stub)
    }
    log.info(
      {
        post: data.post?.stub ?? 'null',
        prev: data.prev?.stub ?? 'null',
        next: data.next?.stub ?? 'null'
      },
      'Getting blog post.'
    )
    return data
  }
}

export default function Blog() {
  const { post, prev, next } = useLoaderData<typeof loader>()
  if (!post) return <div>Post not found</div>

  const navigate = useNavigate()

  return (
    <>
      <div className='post'>
        <div className='header'>
          <h2>{post.title}</h2>
          <p className='date'>{post.date}</p>
        </div>
        <div className='body' dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      {(next || prev) && (
        <div className='pagination'>
          {(next && (
            <span>
              ←{' '}
              <a
                href={`/blog/${next.stub}`}
                className='prev'
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/blog/${next.stub}`)
                }}
              >
                {next.title}
              </a>
            </span>
          )) || <span> </span>}

          {(prev && (
            <span>
              <a
                href={`/blog/${prev.stub}`}
                className='next'
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/blog/${prev.stub}`)
                }}
              >
                {prev.title}
              </a>{' '}
              →
            </span>
          )) || <span> </span>}
        </div>
      )}
    </>
  )
}
