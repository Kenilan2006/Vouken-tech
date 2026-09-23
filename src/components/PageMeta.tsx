import { useEffect } from 'react'

/* @ts-noreturn */
export default function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title}`
  }, [title])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
