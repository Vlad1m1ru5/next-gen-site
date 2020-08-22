import React, { ReactNodeArray } from 'react'

const List: React.FunctionComponent = ({ children }) => {

  const getItem = (component: React.ReactNode, index: number) => (
    <li key={index}>{component}</li>
  )

  return (
    <ul>
      {Array.from(children as ReactNodeArray).map(getItem)}
    </ul>
  )
}

export default List