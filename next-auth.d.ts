import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		isLive: boolean;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends JWT {
		idToken?: string;
		accessToken?: string;
		refreshToken?: string;
		expires: number;
        isLive: boolean;
	}
}
