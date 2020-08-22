import React from 'react'
import { GetStaticProps } from 'next'
import { findAllPaths } from 'api/docs'

type Props = {
  paths: string[]
}

const HomePage: React.FunctionComponent<Props> = ({ paths }) => (
  <>
    <h2>Chewie we&apos;re home</h2>
    <div>
      <ul>
        {paths}
      </ul>
    </div>
  </>
)

export default HomePage

export const getStaticProps: GetStaticProps<Props> = async () => {

  const paths = await findAllPaths()

  return {
    props: {
      paths
    }
  }
}