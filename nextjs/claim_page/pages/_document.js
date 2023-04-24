import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* -- Stylesheets for connect and claim widgets -- */}
        {/* replace the specific version with `latest` to get the most up-to-date version of the widgets. */}
        {/* WARNING: `latest` may cause breakage, so use with caution */}
        <link rel="stylesheet" href="https://connect.manifoldxyz.dev/2.2.4/connect.css" />
        <script src="https://connect.manifoldxyz.dev/2.2.4/connect.umd.js" async></script>

        <script src="https://identity.manifoldxyz.dev/2.1.0/walletIdentity.umd.min.js"></script>
        <link rel="stylesheet" href="https://identity.manifoldxyz.dev/2.1.0/walletIdentity.css" />

        <script src="https://restrictedtoken.manifoldxyz.dev/0.1.0/restrictedToken.umd.min.js"></script>
        <link rel="stylesheet" href="https://restrictedtoken.manifoldxyz.dev/0.1.0/restrictedToken.css" />

        <link rel="stylesheet" href="https://claims.manifoldxyz.dev/1.5.2/claimComplete.css" />
        <script src="https://claims.manifoldxyz.dev/1.5.2/claimComplete.umd.min.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}