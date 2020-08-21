import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Header from 'components/header'
import Footer from 'components/footer'
import Main from 'components/main'

const NextGenSiteApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Next Gen Site</title>
    </Head>
    <Header />
    <Main>
      <Component {...pageProps}/>
    </Main>
    <Footer />
    <style jsx global>
      {`
        body, html {
          font-family: Arial, Helvetica, sans-serif;

          margin: 0;
        }
      `}
    </style>
  </>
)

export default NextGenSiteApp
