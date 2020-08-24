import React from 'react'
import List from 'components/list'
import { GetStaticProps } from 'next'
import { findAllFolders, findAllServicesIn } from 'utils'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

type Props = {
  services: string[]
}

const ServicesPage: React.FunctionComponent<Props> = ({ services }) => {
 
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
      <h1>Services Page</h1>
      <List>
        {services
          .map(getAbsUrl)
          .map(getLink)
        }
      </List>
    </>
  )
}

export default ServicesPage

export const getStaticProps: GetStaticProps<Props> = async () => {

  const folders = await findAllFolders()
  const services = await findAllServicesIn(folders)
  
  return {
    props: {
      services
    }
  }
}