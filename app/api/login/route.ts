import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma'; // Your Prisma client
import { JWT } from 'next-auth/jwt';

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          // Return user details, excluding password
          return { id: user.id.toString(), email: user.email, name: user.name };
        }

        return null; // Return null if credentials are invalid
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    // JWT callback: Add user data to the token on login
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
        token.email = user.email; // Add user email to the token
        token.name = user.name; // Add user name to the token
      }
      return token; // Return the updated token
    },
    
    // Session callback: Add token data to the session object
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id; // Add user ID to the session
        session.user.email = token.email; // Add user email to the session
        session.user.name = token.name; // Add user name to the session
      }
      return session; // Return the updated session
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret in your .env
};

export default NextAuth(authOptions); // Export NextAuth with the provided configuration
