import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* -- Stylesheets for connect and marketplace widgets -- */}
        {/* replace the specific version with `latest` to get the most up-to-date version of the widgets. */}
        {/* WARNING: `latest` may cause breakage, so use with caution */}
        <link rel="stylesheet" href="https://connect.manifoldxyz.dev/2.2.4/connect.css" />
        <script src="https://connect.manifoldxyz.dev/2.2.4/connect.umd.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}