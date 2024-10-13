import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PageResponse } from "./fetch";
import Sqids from "sqids";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUrut = (page: PageResponse<unknown>) => {
	if (page.isFirst) return 1;
	return page.page * page.limit - page.limit + 1;
};

const sqids = new Sqids({
	alphabet: `${process.env.NEXT_PUBLIC_SQUIDS_ALPHABET}`,
	minLength: 16,
});

export const decodeId = (id: string) => (id ? sqids.decode(id).slice(-5)[0] : null);
