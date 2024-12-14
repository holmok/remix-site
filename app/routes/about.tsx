export function meta() {
  return [
    { title: 'About' },
    { name: 'description', content: 'This is an about page.' }
  ]
}

export default function About() {
  return (
    <>
      <h1>About Page</h1>
      <p>
        This is an about page. It doesn't have much to say, but it's here if you
        need it.
      </p>
    </>
  )
}
