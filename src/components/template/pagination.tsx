"use client";
import type { PageResponse } from "@/lib/fetch";
import { Button } from "@ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/select";
import {
	ChevronFirstIcon,
	ChevronLastIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react";
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

	const handleSearch = (key: string, value: unknown) => {
		const params = new URLSearchParams(searchParams);
		params.has(key)
			? params.set(key, String(value))
			: params.append(key, String(value));
		router.push(`${pathname}?${params.toString()}`);
	};

	const navigateToPage = (pageNumber: number) => {
		handleSearch("page", pageNumber);
	};

	const handleLimitChange = (value: string) => {
		const params = new URLSearchParams(searchParams);
		if (params.has("page")) {
			params.set("page", "1");
		}

		if (params.has("limit"))
			params.set("limit", value);
		else
			params.append("limit", value);
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="pt-4">
			<div className="flex flex-row justify-end items-center px-2 gap-2">
				<div className="flex flex-row text-sm items-center gap-2">
					<div className="text-nowrap">Row Per Page</div>
					<Select onValueChange={(value) => handleLimitChange(value)}>
						<SelectTrigger className="border-0" >
							<SelectValue placeholder={page.limit ?? 10} />
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
							Page {page.page} - {page.totalPages} of {totalElement}
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
									onClick={() => navigateToPage(1)}
									disabled={page.isFirst}
								>
									<ChevronFirstIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(page.page - 1)}
									disabled={page.isFirst}
								>
									<ChevronLeftIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(page.page + 1)}
									disabled={page.isLast}
								>
									<ChevronRightIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => navigateToPage(page.totalPages - 1)}
									disabled={page.isLast}
								>
									<ChevronLastIcon className="h-5 w-5" />
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div >
	);
};

export default PageableComponent;
