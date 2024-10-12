import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";
import { prisma } from "./lib/prisma";
import { checkLiveSession, logout, refreshToken } from "./auth.action";

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [Keycloak],
	callbacks: {
		jwt: async ({ token, account }) => {
			if (account) {
				token = {
					...token,
					idToken: account?.id_token as string,
					accessToken: account?.access_token as string,
					refreshToken: account?.refresh_token as string,
					exp: account?.expires_at as number,
					isLive: true,
				};
			}

			const isLive = await checkLiveSession(token.accessToken as string);
			token.isLive = isLive;

			if (Date.now() < (token.exp as number) * 1000) return token;

			if (!token.refreshToken) throw new TypeError("No refresh token");

			const newToken = await refreshToken(token.refreshToken);

			token.accessToken = newToken.access_token;
			token.refreshToken = newToken.refresh_token;
			token.idToken = newToken.id_token;
			token.exp = Math.floor(newToken.expires_in + new Date().getTime() / 1000);

			return token;
		},
		session: async ({ session, token }) => {
			session.isLive = token.isLive;
			return session;
		},
	},
	events: {
		signOut: async (message) => {
			const msg = message as unknown as { token: JWT };
			const token = msg.token;
			await logout(token.idToken as string);
		},
	},
	session: { strategy: "jwt" },

	// debug: process.env.NODE_ENV === "development",
});
