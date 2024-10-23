"use client";
import { Button, type ButtonProps } from "@ui/button";
import { useRouter } from "next/navigation";

interface CancelButtonProps extends ButtonProps {
	path: string;
}
const CancelButton = ({ path, ...props }: CancelButtonProps) => {
	const router = useRouter();
	return (
		<Button
			type="reset"
			variant="destructive"
			size="sm"
			{...props}
			onClick={() => router.push(path)}
		>
			CANCEL
		</Button>
	);
};

export default CancelButton;
