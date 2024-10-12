import { signIn } from "@/auth";
import { Button } from "@ui/button";

const LoginComponent = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("keycloak");
			}}
		>
			<Button type="submit">Login</Button>
		</form>
	);
};

export default LoginComponent;
