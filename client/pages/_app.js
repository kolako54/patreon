import {ApolloProvider} from "@apollo/client";
import {useApollo} from "$apollo/apolloClient"
import {Provider} from "next-auth/client";
import '$styles/globals.css'
import 'swiper/swiper.scss'

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