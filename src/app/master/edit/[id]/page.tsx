import MasterFormComponent from "@/components/master/form";
import { getDetail, getList } from "@/lib/fetch";
import type { MasterTni } from "@/types/master_tni";
import type { Satker } from "@/types/satker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";

export const metadata = {
	title: "Edit Master Tni",
	description: "Form Edit Data Master TNI",
};
const AddMasterPage = async ({ params }: { params: { id: string } }) => {
	const satkerList = await getList<Satker>({
		path: "satker",
	});
	const masterTni = await getDetail<MasterTni>({
		path: "master_tni",
		id: params.id,
	});

	console.log(masterTni);

	return (
		<div className="w-8/12 m-auto">
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>{metadata.title}</CardTitle>
					<CardDescription>{metadata.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-2">
						<MasterFormComponent
							action="edit"
							satkerList={satkerList.data}
							data={masterTni.data}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AddMasterPage;
