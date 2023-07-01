import config from "@/app/config";
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 60 * 24 * 30
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            await axios.post(`${config.BACKEND_ENDPOINT}/auth/login`, {
                email: profile?.email,
                name: profile?.name,
                image: user.image,
            })
            console.log(profile)
            return true;
        }
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }