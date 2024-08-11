import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to the main page after login
      return url === '/profile' ? Promise.resolve('/main') : Promise.resolve('/main')
    },
  },
})

export {handler as GET, handler as POST}