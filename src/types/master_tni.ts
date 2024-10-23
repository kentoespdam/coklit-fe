import { z } from "zod";

export interface MasterTni {
	nosamw: string;
	nama: string;
	satker: string;
	kotama: string;
	is_aktif: boolean;
}

export const masterTniSchema = z.object({
	nosamw: z.string().min(6, "No. Sambung harus diisi"),
	nama: z.string().min(3, "Nama Pelanggan harus diisi"),
	satker: z.string().min(3, "Satker harus diisi"),
	kotama: z.string().min(3, "Kotama harus diisi"),
	is_aktif: z.boolean().default(true),
});

export type masterTniSchema = z.infer<typeof masterTniSchema>;
