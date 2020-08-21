import React from 'react'

const Header: React.FunctionComponent = ({ children }) => (
  <header>
    <h2>My next gen site</h2>
    {children}
  </header>
)

export default Header
