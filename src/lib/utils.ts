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

export const decodeId = (id: string) =>
	id ? sqids.decode(id).slice(-5)[0] : null;

export const enumToArray = <T extends string>(enumObj: Record<T, string>) =>
	Object.entries(enumObj).map(([key, value]) => ({ key, value }));

export const encodeNosamw = (nosamw: string) => {
	const arrNosamw = nosamw
		.split("")
		.map((char) => char.charCodeAt(0) as number);
	return sqids.encode(arrNosamw);
};

export const decodeNosamw = (nosamw: string) => {
	const arrNosamw = sqids.decode(nosamw);
	return arrNosamw.map((num) => String.fromCharCode(num) as string).join("");
};
