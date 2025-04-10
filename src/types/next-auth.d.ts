import { Session } from 'next-auth';
import { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'user' | 'admin';
      image?: string | null; 
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin'; 
    image?: string | null; 
  }
}
