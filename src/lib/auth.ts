import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  theme: {
    logo: "/company-logo-placeholder.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    session({ session, user }) {
      session.user = user;
      return session;
    },
  },
  providers: [Google, Github],
});
