import { set } from "react-hook-form";
import { create } from "zustand";

interface RekeningTniStore {
	isMetLForm: boolean;
	setIsMetLForm: (isMetLForm: boolean) => void;
}

export const useRekeningTniStore = create<RekeningTniStore>((set) => ({
	isMetLForm: false,
	setIsMetLForm: (isMetLForm: boolean) => set({ isMetLForm }),
}));
