import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      // OAuth authentication providers...
      Providers.Google({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      }),
    ],
    pages: {
      signIn: "/login",
    },
    // Optional SQL or MongoDB database to persist users
  })
