import '../styles/globals.css'
import { useEffect } from 'react'
// import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  /**
   * NOTE: prior to v3 of marketplace widgets, it was necessary to trigger the `m-refresh-widgets`
   * event when dynamically changing elements on the page/routes.
   * See the docs for more details: https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/marketplace-widgets/window-events
   */
  // const router = useRouter();
  // useEffect(() => { 
  //   const handleRouteChange = (url, { shallow }) => {
  //     // Note: need to trigger a m-refresh-widgets event every time the URL changes client side
  //     window.dispatchEvent(new Event("m-refresh-widgets"));
  //   }
  //   router.events.on('routeChangeStart', handleRouteChange)
  
  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange)
  //   }
  // }, [])

  return <Component {...pageProps} />
}

export default MyApp
