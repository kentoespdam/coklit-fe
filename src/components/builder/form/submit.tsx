"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" size="sm" disabled={pending}>
			{pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
			{pending ? "Processing..." : "SUBMIT"}
		</Button>
	);
};

export default SubmitButton;
