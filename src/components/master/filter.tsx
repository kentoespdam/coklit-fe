import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@ui/button";
import { ListFilter, PlusCircle, File } from "lucide-react";

const FilterMasterTni = () => {
	return (
		<div className="ml-auto flex justify-end items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="h-7 gap-1">
						<ListFilter className="h-3.5 w-3.5" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Filter
						</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Filter by</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button size="sm" variant="outline" className="h-7 gap-1">
				<File className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
					Export
				</span>
			</Button>
			<Button size="sm" className="h-7 gap-1">
				<PlusCircle className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
					Add Master Tni
				</span>
			</Button>
		</div>
	);
};

export default FilterMasterTni;
