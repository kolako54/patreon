import { ApolloProvider } from "@apollo/client"
import { useApollo } from "$apollo/apolloClient"
import { useSession, signIn } from "next-auth/client"
import { useEffect } from "react"
import { Provider } from "next-auth/client"
import Layout from "$components/Layout"
import PulseLoader from "react-spinners/PulseLoader"
import NProgress from "nprogress"
import Router, { useRouter } from "next/router"
import "$styles/globals.css"
import "swiper/swiper.scss"
import "$styles/nprogress.css"

Router.onRouteChangeStart = url => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

export default function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState)
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        {/*{Component.authOptions?.auth ?*/}
        {/*    <Auth>*/}
        {/*        <Component {...pageProps} />*/}
        {/*    </Auth>*/}
        {/*    :*/}
        {/*    <Component {...pageProps} />*/}
        {/*}*/}
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

// function Auth({children}) {
//     const [session, loading] = useSession()
//     const router = useRouter()
//     const isUser = !!session?.user
//     const {redirect, autoLogin} = children.type.authOptions
//     useEffect(() => {
//         if (loading) return <h1 style={{const: 'purple'}}>Auth Loading...</h1>// Do nothing while
//         // loading
//         if (redirect && !isUser) {
//             return router.push(redirect)
//         }
//         if (!isUser && autoLogin) {
//             signIn("google", {callbackUrl: process.env.NEXTAUTH_URL + '/home'}) // If not
//             // authenticated, force log in
//         }
//     }, [isUser, loading, redirect, router, autoLogin, session])
//
//     if (isUser) {
//         return children
//     }
//
//     // Session is being fetched, or no user.
//     // If no user, useEffect() will redirect.
//     return (
//         <Layout>
//             <PulseLoader
//                 color={"#55e2d0"}
//                 css={{
//                     position: 'absolute',
//                     left: '50%',
//                     top: '47%',
//                     transform: 'translate(-50%,-50%)'
//                 }}/>
//         </Layout>
//     )
// }
