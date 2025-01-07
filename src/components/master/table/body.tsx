import { TableBody, TableCell, TableRow } from "@ui/table";
import type { MasterTniTableProps } from ".";
import { getUrut } from "@/lib/utils";
import MasterTableAction from "./table-action";

const MasterTniTableBody = ({ page }: MasterTniTableProps) => {
	let urut = getUrut(page);
	return (
		<TableBody>
			{page.content.map((row) => (
				<TableRow key={row.nosamw}>
					<TableCell>{urut++}</TableCell>
					<TableCell>{row.nosamw}</TableCell>
					<TableCell>{row.nama}</TableCell>
					<TableCell>{row.kotama}</TableCell>
					<TableCell>{row.satker}</TableCell>
					<TableCell>{row.is_aktif ? "Aktif" : "Tidak Aktif"}</TableCell>
					<TableCell>{row.urjlw}</TableCell>
					<TableCell>
						<MasterTableAction row={row} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default MasterTniTableBody;
