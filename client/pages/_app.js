import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../apolloClient"
import '$styles/globals.css'
import 'swiper/swiper.scss'

function MyApp({Component, pageProps}) {
    const client = useApollo(pageProps.initialApolloState);
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp