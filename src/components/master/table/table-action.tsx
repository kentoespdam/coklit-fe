import type { MasterTni } from "@/types/master_tni";

import LinkButton from "@ui/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@ui/tooltip";
import { PencilIcon } from "lucide-react";
import DeleteDialog from "./delete-dialog";

export type MasterTableActionProps = {
	row: MasterTni;
};

const MasterTableAction = ({ row }: MasterTableActionProps) => {
	return (
		<TooltipProvider>
			<div className="flex space-x-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<LinkButton
							href={`/master/edit/${row.nosamw}`}
							variant="default"
							size="icon"
							className="h-6 w-6"
						>
							<PencilIcon className="h-4 w-4" />
						</LinkButton>
					</TooltipTrigger>
					<TooltipContent className="bg-white text-black border">
						<p>Edit Data Master TNI</p>
					</TooltipContent>
				</Tooltip>
				<DeleteDialog row={row} />
			</div>
		</TooltipProvider>
	);
};

export default MasterTableAction;
