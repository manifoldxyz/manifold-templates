import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* -- Stylesheets for connect and marketplace widgets -- */}
        <link rel="stylesheet" href="https://connect.manifoldxyz.dev/2.2.1/connect.css"></link>
        <link rel="stylesheet" href="https://marketplace.manifoldxyz.dev/3.2.1/marketplace.css" />
        <script src="https://connect.manifoldxyz.dev/2.2.1/connect.umd.js" async></script>
        <script src="https://marketplace.manifoldxyz.dev/3.2.1/marketplace.umd.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}