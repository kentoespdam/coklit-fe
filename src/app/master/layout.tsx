import { Toaster } from "@ui/sonner";

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<Toaster richColors/>
		</>
	);
};

export default MasterLayout;
