import { cn } from "@/lib/utils";
import type { FormZodProps } from "@/types/form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import type { FieldValues } from "react-hook-form";

const InputZod = <TData extends FieldValues>({
	form,
	...props
}: FormZodProps<TData>) => {
	return (
		<FormField
			control={form.control}
			name={props.id}
			render={({ field }) => (
				<FormItem
					className={cn(
						"space-y-1.5",
						props.className,
						props.type === "hidden" && "hidden",
					)}
				>
					<FormLabel>{props.label}</FormLabel>
					<FormControl>
						<Input
							placeholder={`Massukan ${props.label}`}
							{...field}
							{...props}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default InputZod;
