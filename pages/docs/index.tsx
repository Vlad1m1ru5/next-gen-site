import React from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { findAllTitles, findAllByTitleIn } from 'api/docs'
import List from 'components/list'

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

  return (
    <>
      <h2>Documentation page</h2>
      <List>
        {slugs
          .map(getAbsUrl)
          .map(getLink)
        }
      </List>
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