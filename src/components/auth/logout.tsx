import { auth, signOut } from "@/auth";
import { Button } from "@ui/button";
import type { Session } from "next-auth";

const LogoutComponent = async () => {
	const session = await auth();
	if (!session) return null;
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
			className="w-full"
		>
			<Button type="submit">
				Logout
			</Button>
		</form>
	);
};

export default LogoutComponent;
