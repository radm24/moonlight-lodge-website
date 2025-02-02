import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getGuest, createGuest } from "@/app/_lib/data-service";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            full_name: user.name,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
