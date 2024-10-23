import { auth } from "@/auth";
import Unauthorized from "@/components/auth/unauthorize";
import FilterMasterTni from "@/components/master/filter";
import MasterTniTable from "@/components/master/table";
import { getList, getPage } from "@/lib/fetch";
import type { MasterTni } from "@/types/master_tni";
import type { Satker } from "@/types/satker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";

export interface MasterTniSearchRequest {
	pos?: string;
	limit?: string;
	sort?: string[];
	nosamw?: string;
	nama?: string;
	isAktif?: boolean;
	satker?: string;
}

export const metadata = {
	title: "Master Data Tni",
	description: "Manage Master Data TNI.",
};
const MasterPage = async ({
	searchParams,
}: { searchParams: Record<string, string> }) => {
	const session = await auth();

	if (!session) return <Unauthorized />;
	const urlSearch = new URLSearchParams(searchParams);
	const masterTni = await getPage<MasterTni>({
		path: "master_tni",
		searchParams: urlSearch.toString(),
	});
	const satker = await getList<Satker>({
		path: "satker",
	});

	return (
		<Card x-chunk="dashboard-06-chunk-0">
			<CardHeader>
				<CardTitle>{metadata.title}</CardTitle>
				<CardDescription>{metadata.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<FilterMasterTni satkerList={satker.data} />
					<MasterTniTable page={masterTni.data} />
				</div>
			</CardContent>
		</Card>
	);
};

export default MasterPage;
