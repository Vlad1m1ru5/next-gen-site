import React from 'react'
import { GetStaticProps } from 'next'
import { findAllPaths, getAbsUrl } from 'api/docs'
import List from 'components/list'

type Props = {
  paths: string[]
}

const HomePage: React.FunctionComponent<Props> = ({ paths }) => (
  <>
    <h2>Chewie we&apos;re home</h2>
    <div>
      <List>
        {paths}
      </List>
    </div>
  </>
)

export default HomePage

export const getStaticProps: GetStaticProps<Props> = async () => {

  const paths = (await findAllPaths())
    .map(getAbsUrl)

  return {
    props: {
      paths
    }
  }
}