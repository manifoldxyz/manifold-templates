import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => { 
    const handleRouteChange = (url, { shallow }) => {
      // Note: need to trigger a m-refresh-widgets event every time the URL changes client side
      window.dispatchEvent(new Event("m-refresh-widgets"));
    }
    router.events.on('routeChangeStart', handleRouteChange)
  
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <div>
      {/* -- Stylesheets for connect and marketplace widgets -- */}
      <link rel="stylesheet" href="https://connect.manifoldxyz.dev/2.2.1/connect.css"></link>
      <script src="https://connect.manifoldxyz.dev/2.2.1/connect.umd.js" async></script>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
