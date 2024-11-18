"use server";

import type { DeleteSchema } from "@/types/form";
import { revalidatePath } from "next/cache";
import { decodeNosamw } from "./utils";

export interface PageResponse<Entity> {
	content: Entity[];
	total: number;
	limit: number;
	page: number;
	totalPages: number;
	isFirst: boolean;
	isLast: boolean;
}
export interface ApiResponse<Entity> {
	status: number;
	message: string;
	error: string[];
	data: Entity;
}

interface getPageProps {
	path: string;
	searchParams?: string;
	id?: string | number;
}

export const genericGetData = async <Entity>(
	path: string,
): Promise<ApiResponse<Entity>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
	const request = await fetch(url, {
		cache: "no-cache",
	});
	return await request.json();
};

export const getPage = async <Entity>({
	path,
	searchParams,
}: getPageProps): Promise<ApiResponse<PageResponse<Entity>>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?${searchParams}`;
	const request = await fetch(url);
	return await request.json();
};

export const getList = async <Entity>({
	path,
}: getPageProps): Promise<ApiResponse<Entity[]>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
	const request = await fetch(url, {
		cache: "no-cache",
	});
	return await request.json();
};

export const getDetail = async <Entity>({
	path,
	id,
}: getPageProps): Promise<ApiResponse<Entity>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`;
	const request = await fetch(url, {
		cache: "no-cache",
	});
	return await request.json();
};

export const downloadFile = async ({
	path,
	searchParams,
}: getPageProps): Promise<{ type: string; base64: string }> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/${path}?${searchParams}`,
		{
			method: "GET",
		},
	);

	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();

	return {
		type: blob.type,
		base64: Buffer.from(arrayBuffer).toString("base64"),
	};
};

export const postData = async <Entity>({
	path,
	data,
	revalidPath,
}: {
	path: string;
	data: Entity;
	revalidPath: string;
}): Promise<ApiResponse<Entity>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
	// console.log(url);
	const request = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	revalidatePath(revalidPath);
	return await request.json();
};

export const putData = async <Entity>({
	path,
	id,
	data,
	revalidPath,
}: {
	path: string;
	id: string | number;
	data: Entity;
	revalidPath: string;
}): Promise<ApiResponse<Entity>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}/${id}`;
	// console.log(url);
	const request = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	revalidatePath(revalidPath);
	const result = await request.json();
	return result;
};

export const deleteData = async <Entity>({
	path,
	data,
	revalidPath,
}: {
	path: string;
	data: DeleteSchema;
	revalidPath: string;
}): Promise<ApiResponse<Entity | null>> => {
	const nosamw = decodeNosamw(data.unique);
	const deleteId = data.code.replace("DELETE-", "");
	console.log(nosamw, deleteId);
	if (deleteId !== nosamw) {
		return {
			status: 400,
			message: "invalid code",
			error: ["invalid code"],
			data: null,
		};
	}
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}/${nosamw}`;
	// console.log(url);
	const request = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	revalidatePath(revalidPath);
	return await request.json();
};
