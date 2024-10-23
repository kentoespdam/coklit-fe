import type {
	FieldValues,
	Path,
	UseFormRegisterReturn,
	UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

export interface FormZodProps<TData extends FieldValues> {
	id: Path<TData>;
	label?: string;
	form: UseFormReturn<TData>;
	type?: "text" | "number" | "email" | "hidden" | "float" | "file";
	disabled?: boolean;
	fileRef?: UseFormRegisterReturn;
	className?: string;
	readonly?: boolean;
}

export interface FormZodPropsList<TData extends FieldValues>
	extends FormZodProps<TData> {
	list?: unknown[];
}

export const DeleteSchema = z.object({
	unique: z.string(),
	code: z.string().includes("DELETE-"),
});

export type DeleteSchema = z.infer<typeof DeleteSchema>;
