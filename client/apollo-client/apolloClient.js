import { useMemo } from 'react'
import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

// export const typeDefs = gql`
//   extend type Query {
//     isLoggedIn: Boolean!
//   }
// `

let apolloClient

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    // credentials: 'same-origin',
    // headers:{
    // "Access-Control-Allow-Origin": 'http://localhost:3000/',
    // },
    credentials: 'include',
    // fetchOptions: {
    //     origin: 'http://localhost:3000'
    // }
})

const authLink = setContext((_, { headers }) => {
    // const token = localStorage.getItem('token');
    const token = Cookies.get('_csrf')
    console.log(token)
    return {
        headers: {
            ...headers,
            'X-CSRF-TOKEN': token || '',

            // "Access-Control-Allow-Origin": 'http://localhost:3000',
            //   authorization: localStorage.getItem("token") || "",
            // authorization: cookies.get('jwt') || ""
        },
        // typeDefs,
    }
})

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // set to true for SSR
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        // request: async (operation) => {
        //     // const token = sessionStorage.getItem('token')
        //     const token = Cookies.get('_csrf')
        //     console.log(token)

        //     operation.setContext({
        //         headers: {
        //             'X-CSRF-TOKEN': token || '',
        //         },
        //     })
        // },
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()

        // Restore the cache using the data passed from
        // getStaticProps/getServerSideProps combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState })
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient
    return _apolloClient
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    return store
}
