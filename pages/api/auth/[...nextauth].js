import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../lib/mongodb";

const adminEmails = ['yadavkirti7745@gmail.com'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      session.user.id = user.id;
      // if (adminEmails.includes(session?.user?.email)) {
        return session;
      // } else {
      //   return false;
      // }
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.username) {
        user.username = profile.name || profile.email || 'user' + Date.now();
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}
