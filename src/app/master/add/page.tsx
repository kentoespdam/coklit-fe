import MasterFormComponent from "@/components/master/form";
import { getList } from "@/lib/fetch";
import type { Satker } from "@/types/satker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";

export const metadata = {
	title: "Add Master Tni",
	description: "Form Input Data Master TNI",
};
const AddMasterPage = async () => {
	const satkerList = await getList<Satker>({
		path: "satker",
	});

	return (
		<div className="w-8/12 m-auto">
			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>{metadata.title}</CardTitle>
					<CardDescription>{metadata.description}</CardDescription>
				</CardHeader>
				<CardContent>
					<MasterFormComponent action="add" satkerList={satkerList.data} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddMasterPage;
