"use client";
import type { PageResponse } from "@/lib/fetch";
import { Button, buttonVariants } from "@ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/select";
import { Separator } from "@ui/separator";
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PageableComponentProps {
	page: PageResponse<unknown>;
}
const PageableComponent = ({ page }: PageableComponentProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const numberOfElement = page.content.length;
	const totalElement = page.total;
	const first = page.offset === 0;
	const last = page.offset + page.content.length === page.total;
	const totalPages = page.total / page.limit;
	const number = page.offset / page.limit + 1;

	const handleSearch = (key: string, value: unknown) => {
		const params = new URLSearchParams(searchParams);
		params.has(key)
			? params.set(key, String(value))
			: params.append(key, String(value));
		router.push(`${pathname}?${params.toString()}`);
	};

	const navigateToPage = (pageNumber: number) => {
		handleSearch("pos", pageNumber);
	};

	return (
		<div className="pt-4">
			<div className="flex flex-row justify-end items-center px-2 gap-2">
				<div className="flex flex-row text-sm items-center gap-2">
					<div className="text-nowrap">Row Per Page</div>
					<Select>
						<SelectTrigger className="border-0">
							<SelectValue placeholder="10" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="text-sm">
					{numberOfElement > 0 && (
						<>
							{page.offset + 1} - {last} of {totalElement}
						</>
					)}
				</div>
				<div>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(0)}
									disabled={first}
								>
									<ChevronFirstIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(number - 1)}
									disabled={first}
								>
									<ChevronLeftIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(number + 1)}
									disabled={last}
								>
									<ChevronRightIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(totalPages - 1)}
									disabled={last}
								>
									<ChevronLastIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
};

export default PageableComponent;
