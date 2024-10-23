import { cn } from "@/lib/utils";
import type { FormZodProps } from "@/types/form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import { Switch } from "@ui/switch";
import type { FieldValues } from "react-hook-form";

const SwitchZod = <TData extends FieldValues>({
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
						"grid space-y-1.5",
						props.className,
					)}
				>
					<FormLabel>{props.label}</FormLabel>
					<FormControl>
						<Switch
							id="is_aktif"
							name="is_aktif"
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SwitchZod;
