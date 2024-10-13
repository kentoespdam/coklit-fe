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
	errors: string[];
	data: Entity;
}

interface getPageProps {
	path: string;
	searchParams?: string;
}

export const getPage = async <Entity>({
	path,
	searchParams,
}: getPageProps): Promise<ApiResponse<PageResponse<Entity>>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?${searchParams}`;
	// console.log(url);
	const request = await fetch(url);
	return await request.json();
};

export const getList = async <Entity>({
	path,
}: getPageProps): Promise<ApiResponse<Entity[]>> => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
	// console.log(url);
	const request = await fetch(url);
	return await request.json();
};

export const downloadFile = async ({
	path,
	searchParams,
}: getPageProps): Promise<Blob> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/${path}?${searchParams}`,
		{
			method: "GET",
		},
	);

	return response.blob();
};
