"use client";

import { Input } from "@ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { BaseSearchBuilderProps } from "./props";

const InputSearchBuilder = ({
	id,
	label,
	defaultValues = "",
}: BaseSearchBuilderProps) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [value, setValue] = React.useState(
		searchParams.get(id)?.toString() ?? "",
	);
	const { replace } = useRouter();
	const doChange = useDebouncedCallback(() => {
		const search = new URLSearchParams(searchParams);
		if (search.has("page")) search.set("page", "1");
		if (value) search.set(id, value);
		else search.delete(id);
		replace(`${pathname}?${search.toString()}`);
	}, 500);

	useEffect(() => {
		setValue(searchParams.get(id)?.toString() ?? defaultValues);
	}, [searchParams, id, defaultValues]);

	return (
		<div>
			<Input
				type="text"
				placeholder={`Cari ${label}`}
				name={id}
				onChange={(e) => {
					setValue(e.target.value);
					doChange();
				}}
				value={value}
			/>
		</div>
	);
};

export default InputSearchBuilder;
