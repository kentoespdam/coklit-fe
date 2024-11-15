import { auth } from "@/auth";
import Unauthorized from "@/components/auth/unauthorize";
import FilterRekeningTni from "@/components/rekening/filter";
import RekeningTniTable from "@/components/rekening/table";
import { getList, getPage } from "@/lib/fetch";
import type { RekeningTni, rekeningSearchSchema } from "@/types/rekening";
import type { Satker } from "@/types/satker";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";
import { Separator } from "@ui/separator";

export const metadata = {
	title: "Rekening Tni",
	description: "Data Rekening TNI per Periode",
};

const RekeningPage = async ({
	params,
	searchParams,
}: {
	params: { periode: string };
	searchParams: rekeningSearchSchema;
}) => {
	const { periode } = params;
	const session = await auth();

	if (!session) return <Unauthorized />;
	const urlSearch = new URLSearchParams(searchParams);
	const rekening = await getPage<RekeningTni>({
		path: `tni/${periode}`,
		searchParams: urlSearch.toString(),
	});
	const satker = await getList<Satker>({
		path: "satker",
	});

	return (
		<Card x-chunk="dashboard-06-chunk-0">
			<CardHeader>
				<CardTitle>{metadata.title}</CardTitle>
				<CardDescription className="grid gap-1">
					<span>{metadata.description}</span>
					<code className="max-w-fit p-1 bg-gray-100 font-bold text-destructive language-html border rounded-md animate-pulse">
						*doubleclick blue text to edit
					</code>
				</CardDescription>
				<Separator className="my-10" />
				<CardContent>
					<div className="grid gap-2">
						<FilterRekeningTni satkerList={satker.data} periode={periode} />
						<RekeningTniTable page={rekening.data} periode={periode} />
					</div>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default RekeningPage;
