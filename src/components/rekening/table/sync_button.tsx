"use client";

import { genericGetData } from "@/lib/fetch";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			{pending ? (
				<>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					Processing
				</>
			) : (
				"Syncronize"
			)}
		</Button>
	);
};

const SyncRekeningButton = ({ periode }: { periode: string }) => {
	const router = useRouter();
	return (
		<form
			action={async () => {
				const req = await genericGetData(`tni/${periode}/tarik_data`);
				console.log(req.status)

				if (req.status === 201) {
					toast.info(req.status, { description: req.message });
					router.refresh();
				} else {
					toast.warning(req.status, { description: req.message });
				}
			}}
		>
			<SubmitButton />
		</form>
	);
};

export default SyncRekeningButton;
