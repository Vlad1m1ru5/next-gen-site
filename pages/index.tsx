import React from 'react'
import { GetStaticProps } from 'next'
import { getAllPaths, getAbsUrl, getAllEntriesIn } from 'api/docs'
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

  const paths = await getAllPaths()
  const entries = await getAllEntriesIn(paths)
  const urls = await entries.map(getAbsUrl)
 
  return {
    props: {
      paths: urls
    }
  }
}