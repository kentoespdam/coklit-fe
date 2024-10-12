import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PageResponse } from "./fetch";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUrut = (page: PageResponse<unknown>) => {
	if (page.content.length > 0 && page.offset === 0) return 1;
	console.log(page.offset);
	return page.offset + 1;
};
