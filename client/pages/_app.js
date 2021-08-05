import {ApolloProvider} from "@apollo/client";
import {useApollo} from "$apollo/apolloClient"
import {Provider} from "next-auth/client";
import NProgress from 'nprogress'
import Head from 'next/head'
import Router from "next/router";
import '$styles/globals.css'
import 'swiper/swiper.scss'
import '$styles/nprogress.css'

Router.onRouteChangeStart = url => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()


function MyApp({Component, pageProps}) {
    const client = useApollo(pageProps.initialApolloState);
    return (<>
            {/*default title is set to Patreon in Layout page*/}
            <Head>
                <link
                    rel="stylesheet"
                />
            </Head>
            <Provider session={pageProps.session}>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Provider>
        </>
    )
}

export default MyApp