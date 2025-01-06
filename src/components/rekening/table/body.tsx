import { addDot, getUrut } from "@/lib/utils";
import { TableBody, TableCell, TableRow } from "@ui/table";
import type { RekeningTniTableProps } from ".";
import CellForm from "./cell_form";
import SyncRekeningButton from "./sync_button";

const RekeningTniTableBody = ({ page, periode }: RekeningTniTableProps) => {
	let urut = getUrut(page);
	if (page.content.length === 0)
		return (
			<TableBody>
				<TableRow>
					<TableCell colSpan={18} className="h-16 text-center">
						<div className="grid gap-2">
							<h2 className="animate-pulse font-bold text-red-600">
								Data Not Found!
							</h2>
							<SyncRekeningButton periode={periode} />
						</div>
					</TableCell>
				</TableRow>
			</TableBody>
		);
	return (
		<TableBody>
			{page.content.map((row) => {
				const { r1, r2, r3, r4, dnmet, denda, ang_sb, jasa_sb } = row;
				const air = r1 + r2 + r3 + r4 + dnmet;
				const tagihan = air + denda + ang_sb + jasa_sb;
				return (
					<TableRow key={row.id}>
						<TableCell align="right" className="border-x text-nowrap">
							{urut++}
						</TableCell>
						<TableCell className="border-x text-nowrap">{row.matra}</TableCell>
						<TableCell className="border-x text-nowrap">{row.satker}</TableCell>
						<TableCell className="border-x text-nowrap">{row.nosamw}</TableCell>
						<TableCell className="border-x text-nowrap">{row.nama}</TableCell>
						<TableCell className="border-x text-nowrap">{row.alamat}</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.met_l_ori)}
						</TableCell>
						<CellForm row={row} field="met_l" />
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.met_k_ori)}
						</TableCell>
						<CellForm row={row} field="met_k" />
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.pakai_ori)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.pakai)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.rata2_ori)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.rata2)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(0)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(air)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(row.denda)}
						</TableCell>
						<TableCell className="border-x text-nowrap" align="right">
							{addDot(tagihan)}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default RekeningTniTableBody;
