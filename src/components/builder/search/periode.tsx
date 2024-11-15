"use client";

import { cn, getPeriodeList } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const PeriodeSearchBuilder = () => {
	const [open, setOpen] = React.useState(false);
	const pathname = usePathname();
	const currentPeriode = pathname.split("/").findLast((item) => item);
	const { replace } = useRouter();
	const periodeList = getPeriodeList();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className="w-full max-w-[200px] justify-between"
				>
					<span
						className={cn(
							"truncate",
							currentPeriode !== null ? "opacity-100" : "opacity-70",
						)}
					>
						{currentPeriode !== null ? currentPeriode : "Pilih Periode"}
					</span>
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Pilih Periode" />
					<CommandList>
						<CommandEmpty>Periode tidak ditemukan</CommandEmpty>
						<CommandGroup>
							{periodeList.map((periode) => (
								<CommandItem
									key={periode}
									value={periode}
									onSelect={(value) => {
										replace(`/rekening/${value}`);
										setOpen(false);
									}}
								>
									{periode}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default PeriodeSearchBuilder;
