import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        // OAuth authentication providers...
        Providers.Google({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }),
    ],
    // Optional SQL or MongoDB database to persist users
})