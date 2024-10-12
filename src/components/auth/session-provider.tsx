"use client";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

const AuthSessionProvider = ({ session }: { session: Session }) => {
	if (!session.isLive) {
		setTimeout(() => {
			signOut();
		}, 1000);
	}
	return null;
};

export default AuthSessionProvider;
