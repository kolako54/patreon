import {ApolloProvider} from "@apollo/client";
import {useApollo} from "$apollo/apolloClient"
import {Provider} from "next-auth/client";
import NProgress from 'nprogress'
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
    return (
        <Provider session={pageProps.session}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    )
}

export default MyApp