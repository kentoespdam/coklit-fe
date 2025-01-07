"use client";
import CancelButton from "@/components/builder/form/cancel";
import SubmitButton from "@/components/builder/form/submit";
import InputZod from "@/components/builder/form/zod/input";
import KotamaZod from "@/components/builder/form/zod/kotama";
import SatkerZod from "@/components/builder/form/zod/satker";
import SwitchZod from "@/components/builder/form/zod/switch";
import { postData, putData } from "@/lib/fetch";
import { type MasterTni, masterTniSchema } from "@/types/master_tni";
import type { Satker } from "@/types/satker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type MasterFormComponentProps = {
	action: "add" | "edit";
	satkerList: Satker[];
	data?: MasterTni;
};

const MasterFormComponent = ({
	action,
	satkerList,
	data,
}: MasterFormComponentProps) => {
	const router = useRouter();
	const form = useForm<masterTniSchema>({
		resolver: zodResolver(masterTniSchema),
		defaultValues: {
			nosamw: data?.nosamw ?? "",
			nama: data?.nama ?? "",
			satker: data?.satker ?? "",
			kotama: data?.kotama ?? "",
			is_aktif: data?.is_aktif ?? true,
		},
	});

	const handleFormSubmit = async (formData: masterTniSchema) => {
		const response = await (action === "add"
			? postData<masterTniSchema>({
					path: "master_tni",
					data: formData,
					revalidPath: "/master",
				})
			: putData<masterTniSchema>({
					path: "master_tni",
					id: formData.nosamw,
					data: formData,
					revalidPath: "/master",
				}));

		if (response.status === 200 || response.status === 201) {
			toast.success(response.status, {
				description: response.message,
				duration: 13000,
			});
			router.push("/master");
		} else {
			response.error.map((err) =>
				toast.error(response.status, {
					description: err,
					duration: 3000,
				}),
			);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="grid grid-cols-2 gap-3"
			>
				<InputZod
					id="nosamw"
					label="No. Sambung"
					form={form}
					disabled={action === "edit"}
				/>
				<InputZod id="nama" label="Nama Pelanggan" form={form} />
				<KotamaZod id="kotama" label="Kotama" form={form} />
				<SatkerZod id="satker" label="Satker" form={form} list={satkerList} />
				<SwitchZod id="is_aktif" label="Aktif" form={form} />

				<div className="flex justify-end col-span-2 gap-2">
					<SubmitButton />
					<CancelButton path="/master" />
				</div>
			</form>
		</Form>
	);
};

export default MasterFormComponent;
