import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma'; 
import { JWT } from 'next-auth/jwt';  

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
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },  
        });

        // If user and password are correct, return user details
        if (user && user.password === credentials.password) {
          return {
            id: user.id.toString(),
            email: user.email,
            password: user.password, 
          };
        }

        return null; 
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // Add the user data to the token on login
        token.id = user.id;
        token.email = user.email;  
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
  adapter: PrismaAdapter(prisma),  
  secret: process.env.NEXTAUTH_SECRET,  
};

export default NextAuth(authOptions);
