import {cache} from "./cache";
import {useMemo} from "react";
import {ApolloClient, createHttpLink} from "@apollo/client";

let apolloClient;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined", // set to true for SSR
        link: new createHttpLink({
            uri: "http://localhost:4000/graphql",
            credentials: 'same-origin',
            // catch: new InMemoryCache(),
            // headers: {
            //     cookie: req.header('Cookie'),
            // },
        }),
        cache,
        credentials: 'include',
        // headers: {
        //     authorization: localStorage.getItem('token'),
        //     'client-name': 'Patreon Web',
        //     'client-version': '1.0.0'
        // }
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}