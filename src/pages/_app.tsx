import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>REPOS.IO</title>
      </Head>
      <Component {...pageProps} />
    </>)
}

export default MyApp
