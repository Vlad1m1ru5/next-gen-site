import React from 'react'
import List from 'components/list'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getAllPaths, getAllEntriesIn, getAllTomesIn, getRoutesFor } from 'api/docs'

type Props = {
  routes: string[]
}

const HomePage: React.FunctionComponent<Props> = ({ routes }) => {

  const getAbsUrl = (slug: string) => `/${slug}`

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
      <h2>Navigate through pages</h2>
      <div>
        <List>
          {routes
            .map(getAbsUrl)
            .map(getLink)
          }
        </List>
      </div>
    </>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<Props> = async () => {

  const paths = await getAllPaths()
  const entries = await getAllEntriesIn(paths)
  const tomes = await getAllTomesIn(entries)
  const routes = tomes.map(getRoutesFor)
  
  return {
    props: {
      routes
    }
  }
}