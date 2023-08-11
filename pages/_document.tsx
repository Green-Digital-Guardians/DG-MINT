import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

function _document ({ children }: any) {
  return (
    <Html>
      <Head>
        <meta
          content='DG Guardians mint'
          name='This is a DAPP for minting DG Guardians NFTS.'
        />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default _document
