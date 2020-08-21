import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { findAllTitles, findAllByTitleIn } from 'api/docs'

type Params = {
  slug: string
} 

type Props = {
  title: string
}

const DocPage: React.FunctionComponent<Props> = ({ title }) => (
  <h2>{title}</h2>
)

export default DocPage

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  
  const title = params?.slug || ''

  return {
    props: {
      title
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const titles = await findAllTitles()
  const slugs = await findAllByTitleIn(titles)
  
  const paths = slugs
    .map(slug => ({ slug }))
    .map((params) => ({ params }))

  return {
    paths,
    fallback: false
  }
}
