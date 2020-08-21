import React from 'react'

const Header: React.FunctionComponent = ({ children }) => (
  <header>
    <h1>My next gen site</h1>
    {children}
  </header>
)

export default Header
