import InputSearchBuilder from "@/components/builder/search/input";
import PeriodeSearchBuilder from "@/components/builder/search/periode";
import SatkerSearchBuilder from "@/components/builder/search/satker";
import ResetFilter from "@/components/master/filter/reset";
import type { Satker } from "@/types/satker";
import ExportRekeningTniButton from "./export";

interface FilterRekeningTniProps {
	satkerList: Satker[];
	periode: string
}
const FilterRekeningTni = ({ satkerList, periode }: FilterRekeningTniProps) => {
	return (
		<div className="grid gap-2 grid-cols-12">
			<div className="w-full col-span-8 flex gap-2">
				<PeriodeSearchBuilder />
				<InputSearchBuilder id="nosamw" label="No Sambung" />
				<InputSearchBuilder id="nama" label="Nama" />
				<SatkerSearchBuilder
					id="satker_id"
					label="Satker"
					satkerList={satkerList}
				/>
				<ResetFilter />
			</div>
			<div className="col-span-4 ml-auto">
				<ExportRekeningTniButton periode={periode} />
			</div>
		</div>
	);
};

export default FilterRekeningTni;
