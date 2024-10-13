"use client"

import { Input } from "@ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import type { ChangeEvent } from "react"
import { useDebouncedCallback } from "use-debounce"
import type { BaseSearchBuilderProps } from "./props"

const InputSearchBuilder = ({ id, label }: BaseSearchBuilderProps) => {
    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams)
    const { replace } = useRouter()
    const doChange = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (search.has("page"))
            search.set("page", "1")
        if (!e.target.value) search.delete(id)
        else search.set(id, e.target.value)
        replace(`${location.pathname}?${search.toString()}`)
    }, 500)

    return (
        <Input
            type="text"
            placeholder={`Cari ${label}`}
            name={id}
            onChange={doChange}
            defaultValue={search.get(id) ?? ""}
        />
    );
}

export default InputSearchBuilder;