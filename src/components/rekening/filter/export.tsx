"use client";
import { downloadFile } from "@/lib/fetch";
import { base64toBlob } from "@/lib/utils";
import { Button } from "@ui/button";
import { File } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
const ExportRekeningTniButton = ({ periode }: { periode: string }) => {
	const searchParams = useSearchParams();

	const download = async () => {
		if (!searchParams.get("satker_id")) {
			toast.error("Pilih Satker Terlebih Dahulu");
			return;
		}

		const req = await downloadFile({
			path: `tni/${periode}/${searchParams.get("satker_id")}/csv`,
		});

		const blob = base64toBlob(req.base64, req.type);

		const fileName = `coklit_tni_${periode}_${new Date().toISOString()}.csv`;
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `${fileName}`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<Button
			variant="outline"
			className="gap-1 bg-primary text-primary-foreground"
			onClick={download}
		>
			<File className="h-3.5 w-3.5" />
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				Export
			</span>
		</Button>
	);
};

export default ExportRekeningTniButton;
