import React from 'react'
import { findAllTitles, findAllByTitleIn } from 'api/docs'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'

type Props = {
  slugs: string[]
}

const DocsPage: React.FunctionComponent<Props> = ({ slugs }) => {
  
  const { route } = useRouter()

  const getAbsUrl = (slug: string) => `${route}/${slug}`

  const getLink = (path: string, index: number) => (
    <Link
      key={index}
      href={path}
    >
      <a>{path}</a>
    </Link>
  )

  const getItem = (component: JSX.Element, index: number) => (
    <li key={index}>{component}</li>
  )

  return (
    <>
      <h2>Documentation page</h2>
      <ul>
        {slugs
          .map(getAbsUrl)
          .map(getLink)
          .map(getItem)
        }
      </ul>
    </>
  )
}

export default DocsPage

export const getStaticProps: GetStaticProps<Props> = async () => {

  const titles = await findAllTitles()
  const slugs = await findAllByTitleIn(titles)

  return {
    props: {
      slugs
    }
  }
}