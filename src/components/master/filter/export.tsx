"use client";

import { downloadFile } from "@/lib/fetch";
import { base64toBlob } from "@/lib/utils";
import { Button } from "@ui/button";
import { File } from "lucide-react";
import { useSearchParams } from "next/navigation";

const ExportMasterButton = () => {
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);

	const download = async (type: string) => {
		const req = await downloadFile({
			path: `master_tni/export/${type}`,
			searchParams: search.toString(),
		});

		const blob = base64toBlob(req.base64, req.type);

		const fileName = `coklit_master_tni_${new Date().toISOString()}.${type === "csv" ? "csv" : "xlsx"}`;
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `${fileName}`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			<Button
				size="sm"
				variant="outline"
				className="gap-1 bg-primary text-primary-foreground"
				onClick={() => download("excel")}
			>
				<File className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
					Export
				</span>
			</Button>
			<Button
				size="sm"
				variant="outline"
				className="gap-1 bg-primary text-primary-foreground"
				onClick={() => download("csv")}
			>
				<File className="h-3.5 w-3.5" />
				<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
					Export CSV
				</span>
			</Button>
		</>
	);
};

export default ExportMasterButton;
