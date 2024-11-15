import PageableComponent from "@/components/template/pagination";
import type { PageResponse } from "@/lib/fetch";
import type { RekeningTni } from "@/types/rekening";
import { Table, TableHead, TableHeader, TableRow } from "@ui/table";
import RekeningTniTableBody from "./body";
import { TooltipProvider } from "@ui/tooltip";
import { Toaster } from "@ui/sonner";

export interface RekeningTniTableProps {
	page: PageResponse<RekeningTni>;
	periode: string;
}
const RekeningTniTable = ({ page, periode }: RekeningTniTableProps) => {
	return (
		<div className="overflow-x-auto">
			<TooltipProvider>
				<Table className="border">
					<TableHeader>
						<TableRow>
							<TableHead className="border text-center" rowSpan={2}>
								No
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Matra
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Satker
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								No Sambung
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Nama
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Alamat
							</TableHead>
							<TableHead className="border text-center" colSpan={2}>
								Meter Lalu
							</TableHead>
							<TableHead className="border text-center" colSpan={2}>
								Meter Kini
							</TableHead>
							<TableHead className="border text-center" colSpan={2}>
								Meter Pakai
							</TableHead>
							<TableHead className="border text-center" colSpan={2}>
								Rata-Rata
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Adm
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Air
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Denda
							</TableHead>
							<TableHead className="border text-center" rowSpan={2}>
								Tagihan
							</TableHead>
						</TableRow>
						<TableRow>
							<TableHead className="border text-center">Original</TableHead>
							<TableHead className="border text-center">Edited</TableHead>
							<TableHead className="border text-center">Original</TableHead>
							<TableHead className="border text-center">Edited</TableHead>
							<TableHead className="border text-center">Original</TableHead>
							<TableHead className="border text-center">Edited</TableHead>
							<TableHead className="border text-center">Original</TableHead>
							<TableHead className="border text-center">Edited</TableHead>
						</TableRow>
					</TableHeader>
					<RekeningTniTableBody page={page} periode={periode} />
				</Table>
			</TooltipProvider>
			<PageableComponent page={page} />
			<Toaster/>
		</div>
	);
};

export default RekeningTniTable;
