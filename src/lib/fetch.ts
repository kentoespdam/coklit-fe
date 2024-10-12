export interface PageResponse<Entity> {
	content: Entity[];
	total: number;
	limit: number;
	offset: number;
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

export const getPage = async <Entity>({ path, searchParams }: getPageProps) => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?${searchParams}`;
	console.log(url);
	const request = await fetch(url);
	return await request.json();
};
