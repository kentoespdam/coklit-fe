"use client";
import InputZod from "@/components/builder/form/zod/input";
import { putData } from "@/lib/fetch";
import { addDot, cn, getTypeValue } from "@/lib/utils";
import type { RekeningTni, RekeningTniSchema } from "@/types/rekening";
import { Button } from "@ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { TableCell } from "@ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { CheckIcon, XIcon } from "lucide-react";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import { type Path, useForm } from "react-hook-form";

interface MetLFormProps {
	row: RekeningTni;
	field: keyof RekeningTni;
}

interface FormComponentProps extends MetLFormProps {
	setIsForm: Dispatch<SetStateAction<boolean>>;
}

const FormComponent = ({ row, field, setIsForm }: FormComponentProps) => {
	const fieldId = field as Path<RekeningTniSchema>;
	const form = useForm<RekeningTniSchema>({
		defaultValues: {
			nosamw: row.nosamw,
			met_l: row.met_l,
			met_k: row.met_k_ori,
			pakai: row.pakai_ori,
			rata2: row.pakai_ori,
		},
	});

	const handleSubmit = async (value: RekeningTniSchema) => {
		const response = await putData({
			path: "tni",
			id: row.id,
			data: value,
			revalidPath: "/tni",
		});

		if (response.status === 201) setIsForm(false);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-row justify-evenly gap-1 items-center"
			>
				<InputZod id="nosamw" form={form} className="hidden" />
				<FormField
					control={form.control}
					name={fieldId}
					render={({ field }) => (
						<FormItem className="space-y-0">
							<FormControl className="space-y-0">
								<Input
									type="number"
									placeholder={`Massukan ${field}`}
									className="text-right w-20 p-0 h-auto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" size="icon" className="h-5 w-5">
					<CheckIcon className="h-4 w-4" />
				</Button>
				<Button
					type="reset"
					size="icon"
					className="h-5 w-5 bg-destructive text-destructive-foreground"
					onClick={() => setIsForm(false)}
				>
					<XIcon className="h-4 w-4" />
				</Button>
			</form>
		</Form>
	);
};

const CellForm = ({ row, field }: MetLFormProps) => {
	const [isForm, setIsForm] = useState(false);
	const text = useMemo(
		() => addDot(getTypeValue<RekeningTni>(row, field) as number),
		[row, field],
	);

	return (
		<TableCell
			onDoubleClick={() => (!isForm ? setIsForm((prev) => !prev) : null)}
			className={cn("border-x text-nowrap", !isForm ? "text-indigo-400" : "")}
			align="right"
			data-tooltip-target="tooltip-light"
		>
			{isForm ? (
				<FormComponent row={row} field={field} setIsForm={setIsForm} />
			) : (
				<Tooltip delayDuration={100}>
					<TooltipTrigger>
						<span className="cursor-pointer hover:text-primary hover:font-bold">
							{text}
						</span>
					</TooltipTrigger>
					<TooltipContent>Double click to edit</TooltipContent>
				</Tooltip>
			)}
		</TableCell>
	);
};

export default CellForm;
