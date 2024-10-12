import { auth } from "@/auth";
import LogoutComponent from "./logout";
import LoginComponent from "./sign-in";

const LoginLogoutButton = async () => {
	const session = await auth();
	if (!session)
		return (
			<div>
				<LoginComponent />
			</div>
		);
	return (
		<div>
			<LogoutComponent />
		</div>
	);
};

export default LoginLogoutButton;
