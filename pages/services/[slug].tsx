import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { findAllFolders, findAllServicesIn, getServiceBy } from 'utils'
import markdownToHtml from 'utils/markdown-to-html'

type Params = {
  slug: string
} 

type Props = {
  service: {
    content: string
    title: string
  }
}

const DocPage: React.FunctionComponent<Props> = ({
  service: {
    title,
    content
  }
}) => (
  <>
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
  </>
)

export default DocPage

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  
  const title = params?.slug || ''
  const service = await getServiceBy(title, [ 'content', 'title' ])
  const content = await markdownToHtml(service.content)

  return {
    props: {
      service: {
        ...service,
        content
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const folders = await findAllFolders()
  const services = await findAllServicesIn(folders)
  
  const paths = services
    .map(slug => ({ slug }))
    .map((params) => ({ params }))

  return {
    paths,
    fallback: false
  }
}