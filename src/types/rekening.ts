import { z } from "zod";

export interface RekeningTni {
	id: string;
	pdam: string;
	matra: string;
	satker: string;
	nosamw: string;
	nama: string;
	alamat: string;
	met_l_ori: number;
	met_l: number;
	met_k_ori: number;
	met_k: number;
	pakai_ori: number;
	pakai: number;
	rata2: number;
	rata2_ori: number;
	dnmet: number;
	r1: number;
	r2: number;
	r3: number;
	r4: number;
	t1: number;
	t2: number;
	t3: number;
	t4: number;
	denda: number;
	ang_sb: number;
	jasa_sb: number;
	statrek: string;
	isAktif: boolean;
}

export const rekeningSearchSchema = z.object({
	periode: z.string().optional(),
	nosamw: z.string().optional(),
	nama: z.string().optional(),
	satker_id: z.string().optional(),
});

export type rekeningSearchSchema = z.infer<typeof rekeningSearchSchema>;

export const RekeningTniSchema= z.object({
	nosamw: z.string(),
	met_l: z.number(),
	met_k: z.number(),
	pakai: z.number(),
	rata2: z.number(),
});

export type RekeningTniSchema = z.infer<typeof RekeningTniSchema>;