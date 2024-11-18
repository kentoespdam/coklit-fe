import type { Satker } from "@/types/satker";
import LinkButton from "@ui/link";
import { PlusCircle } from "lucide-react";
import InputSearchBuilder from "../../builder/search/input";
import SatkerSearchBuilder from "../../builder/search/satker";
import ExportMasterButton from "./export";
import ResetFilter from "./reset";

interface FilterMasterTniProps {
	satkerList: Satker[];
}
const FilterMasterTni = ({ satkerList }: FilterMasterTniProps) => {
	return (
		<div className="grid gap-2 grid-cols-12">
			<div className="w-full col-span-8 flex gap-2">
				<div>
					<InputSearchBuilder id="nosamw" label="No. Sambung" />
				</div>
				<div>
					<InputSearchBuilder id="nama" label="Nama" />
				</div>
				<div>
					<SatkerSearchBuilder
						id="satker_id"
						label="Satker"
						satkerList={satkerList}
					/>
				</div>
				<ResetFilter />
			</div>
			<div className="col-span-4 ml-auto flex justify-between items-center gap-2">
				<ExportMasterButton />
				<LinkButton href="/master/add" size="sm" className="gap-1">
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Master Tni
					</span>
				</LinkButton>
			</div>
		</div>
	);
};

export default FilterMasterTni;
