import React from 'react'
import { AppProps } from 'next/app'

const NextGenSiteApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps}/>
  </>
)

export default NextGenSiteApp
