"use client"

import { cn, decodeId } from "@/lib/utils"
import type { Satker } from "@/types/satker"
import { Button } from "@ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { useDebouncedCallback } from "use-debounce"
import type { BaseSearchBuilderProps } from "./props"

interface SatkerSearchBuilderProps extends BaseSearchBuilderProps {
    satkerList: Satker[]
}
const SatkerSearchBuilder = ({ satkerList, id, label }: SatkerSearchBuilderProps) => {
    const [open, setOpen] = React.useState(false)

    const searchParams = useSearchParams()
    const search = new URLSearchParams(searchParams)
    const { replace } = useRouter()
    const doChange = useDebouncedCallback((val: string) => {
        if (search.has("page"))
            search.set("page", "1")
        if (!val) search.delete(id)
        else search.set(id, val)
        replace(`${location.pathname}?${search.toString()}`)
    }, 500)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    aria-expanded={open}
                    className="w-full max-w-[200px] justify-between"
                >
                    <span className={cn("truncate",
                        search.has(id) && search.get(id) !== null ? "opacity-100" : "opacity-70"
                    )}>
                        {search.has(id) && search.get(id) !== null ? satkerList.find((item) => decodeId(item.id) === decodeId(search.get(id) ?? ""))?.nama : "Select Satker..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search Satker..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {satkerList.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={(currentValue) => {
                                        doChange(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            search.has(id) && decodeId(search.get(id) ?? "") === decodeId(item.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.nama}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default SatkerSearchBuilder;