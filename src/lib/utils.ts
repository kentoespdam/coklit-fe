import { type ClassValue, clsx } from "clsx";
import Sqids from "sqids";
import { twMerge } from "tailwind-merge";
import type { PageResponse } from "./fetch";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUrut = (page: PageResponse<unknown>) => {
	if (!page) return 0;
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

export const getCurrentPeriode = () => {
	const now = new Date();
	const currentMonth = now.getMonth();
	const year = currentMonth === 0 ? now.getFullYear() - 1 : now.getFullYear();
	const month =
		currentMonth === 0
			? "12"
			: currentMonth < 10
				? `0${now.getMonth()}`
				: now.getMonth();
	return `${year}${month}`;
};

export const getPeriodeList = () => {
	const now = new Date();
	const year = now.getFullYear();
	const periodeList = [];

	let y = 1;
	for (let i = 0; i < 24; i++) {
		const month = (y++).toString().padStart(2, "0");
		if (i < 12) periodeList.push(`${year - 1}${month}`);
		else periodeList.push(`${year}${month}`);
		if (i === 11) y = 1;
	}
	return periodeList.sort((a, b) => b.localeCompare(a));
};

export const addDot = (num: number) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTypeValue = <T>(row: T, field: keyof T) => row[field];

export const base64toBlob = (base64: string, mime: string) => {
	const byteCharacters = atob(base64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	return new Blob([byteArray], { type: mime });
};
