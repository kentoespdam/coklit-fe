import { cn } from "@/lib/utils";
import type { FormZodPropsList } from "@/types/form";
import type { Satker } from "@/types/satker";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckIcon } from "lucide-react";
import React from "react";
import type { FieldValues } from "react-hook-form";

const SatkerZod = <TData extends FieldValues>({
	form,
	list,
	...props
}: FormZodPropsList<TData>) => {
	const [open, setOpen] = React.useState(false);
	if (!list || list.length <= 0) return null;
	const satkerList = list as Satker[];
	return (
		<FormField
			control={form.control}
			name={props.id}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{props.label}</FormLabel>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-between",
										!field.value ? "text-muted-foreground" : "text-foreground",
									)}
								>
									<span className="text-left flex-1 truncate">
                                        {field.value || "Pilih Satker"}
									</span>
									<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-full p-0">
							<Command>
								<CommandInput placeholder="Type to search..." />
								<CommandList>
									<CommandEmpty>No results found.</CommandEmpty>
									{satkerList.map((item) => (
										<CommandItem
											key={item.id}
											value={item.nama}
											onSelect={() => {
												field.onChange(item.nama);
												setOpen(false);
											}}
										>
											{item.nama}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													item.nama === field.value
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									))}
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
                    <FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SatkerZod;
