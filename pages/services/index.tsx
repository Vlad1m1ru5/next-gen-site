import React from 'react'
import List from 'components/list'
import { GetStaticProps } from 'next'
import { findAllFolders, findAllServicesIn } from 'utils'

type Props = {
  services: string[]
}

const ServicesPage: React.FunctionComponent<Props> = ({ services }) => (
  <>
    <h1>Services Page</h1>
    <List>
      {services}
    </List>
  </>
)

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