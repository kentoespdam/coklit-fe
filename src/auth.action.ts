"use server";

import { auth } from "./auth";
import { prisma } from "./lib/prisma";

export const logout = async (token: string) => {
	const params = new URLSearchParams();
	params.append("id_token_hint", token);
	await fetch(
		`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?${params.toString()}`,
	);
};

/**
 * Checks if a given token is still valid by making a request to the Keycloak
 * UserInfo endpoint and checking the response status code.
 *
 * @param token - The token to check.
 * @returns `true` if the token is valid, `false` otherwise.
 */
export const checkLiveSession = async (token: string): Promise<boolean> => {
	const request = await fetch(
		`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method: "GET",
		},
	);

	return request.status !== 401;
};

export const refreshToken = async (token: string) => {
	console.log("refreshing token executed");
	const request = await fetch(
		`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				client_id: process.env.AUTH_KEYCLOAK_ID as string,
				client_secret: process.env.AUTH_KEYCLOAK_SECRET as string,
				grant_type: "refresh_token",
				refresh_token: token,
			}),
		},
	);
	const response = await request.json();
	if (!request.ok) throw response;

	return response;
};
