import React from 'react'
import List from 'components/list'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'

type Props = {
  routes: string[]
}

const HomePage: React.FunctionComponent<Props> = ({ routes }) => {

  const { route } = useRouter()

  const getAbsUrl = (slug: string) => `${route}${slug}`

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
      <h2>Home Page</h2>
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

  const routes = ['services']

  return {
    props: {
      routes
    }
  }
}