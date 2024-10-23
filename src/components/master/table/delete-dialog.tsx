"use client";
import InputZod from "@/components/builder/form/zod/input";
import { encodeNosamw } from "@/lib/utils";
import { DeleteSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog";
import { Form } from "@ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { DeleteIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { MasterTableActionProps } from "./table-action";
import { deleteData } from "@/lib/fetch";
import type { MasterTni } from "@/types/master_tni";
import { toast } from "sonner";

const DeleteDialog = ({ row }: MasterTableActionProps) => {
	const form = useForm<DeleteSchema>({
		resolver: zodResolver(DeleteSchema),
		defaultValues: {
			unique: "",
			code: "",
		},
		values: {
			unique: encodeNosamw(row.nosamw),
			code: "",
		},
	});

	const submitHandler = async (data: DeleteSchema) => {
		const response = await deleteData<MasterTni>({
			path: "master_tni",
			data: data,
			revalidPath: "/master",
		});
		console.log(response);
		if (response.status === 200) {
			toast.success(response.status, {
				description: response.message,
				duration: 13000,
			});
		} else {
			response.error.map((err) =>
				toast.error(response.status, {
					description: err,
					duration: 3000,
				}),
			);
		}
	};

	return (
		<Dialog>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button variant="destructive" size="icon" className="h-6 w-6">
							<DeleteIcon className="h-4 w-4" />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent className="bg-white text-black border">
					<p>Delete Data Master TNI</p>
				</TooltipContent>
			</Tooltip>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Hapus Data TNI</DialogTitle>
					<DialogDescription className="flex flex-col gap-2">
						Silahkan Ketik
						<code className="font-bold border p-1 bg-muted w-fit">
							DELETE-{row.nosamw}
						</code>
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="grid gap-4"
					>
						<InputZod id="unique" label="Unique" form={form} type="hidden" />
						<InputZod id="code" label="Code" form={form} />
						<DialogFooter>
							<Button type="submit">DELETE</Button>
							<DialogClose asChild>
								<Button type="reset" variant="destructive">
									Cancel
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteDialog;
