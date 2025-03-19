import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma'; // Adjust import if needed
import { JWT } from 'next-auth/jwt';  // Import JWT type

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
          return null; // If no email or password is provided, return null
        }

        // Find user by email in the updated 'user' table
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },  // Search by email
        });

        // If user exists and password matches, return user details
        if (user && user.password === credentials.password) {
          return {
            id: user.id.toString(),  // Use id from 'user' model
            email: user.email,
            password: user.password, // You can include password but typically avoid including it in the session
          };
        }

        return null; // Invalid credentials or user not found
      },
    }),
  ],
  session: {
    strategy: 'jwt',  // Use JWT-based sessions
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // Add the user data to the token on login
        token.id = user.id;  // Store the user ID in the token
        token.email = user.email;  // Store the user email in the token
      }
      return token;  // Return the token with user data
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        // Add token data (id and email) to the session object
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;  // Return the updated session
    },
  },
  adapter: PrismaAdapter(prisma),  // Use the Prisma Adapter
  secret: process.env.NEXTAUTH_SECRET,  // Set your NextAuth secret in the .env
};

export default NextAuth(authOptions);
