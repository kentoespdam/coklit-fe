import PageableComponent from "@/components/template/pagination";
import type { PageResponse } from "@/lib/fetch";
import type { MasterTni } from "@/types/master_tni";
import { Table, TableHead, TableHeader, TableRow } from "@ui/table";
import MasterTniTableBody from "./body";
export interface MasterTniTableProps {
	page: PageResponse<MasterTni>;
}
const MasterTniTable = ({ page }: MasterTniTableProps) => {
	return (
		<div>
			<Table className="border">
				<TableHeader>
					<TableRow>
						<TableHead>No</TableHead>
						<TableHead>No Sambung</TableHead>
						<TableHead>Nama</TableHead>
						<TableHead>Kotama</TableHead>
						<TableHead>Satker</TableHead>
						<TableHead>Aktif</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<MasterTniTableBody page={page} />
			</Table>
			<PageableComponent page={page} />
		</div>
	);
};

export default MasterTniTable;
