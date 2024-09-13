import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { NextAuthOptions } from 'next-auth';

// Define NextAuth options
export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, user, token }) {
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token;
        },
        async redirect({ url, baseUrl }) {
            // Redirect user to '/overview' after login
            return '/admin/overview';
        },
    },
};

// Initialize NextAuth
const handler = NextAuth(authOptions);

// Export handler as GET and POST
export { handler as GET, handler as POST };
