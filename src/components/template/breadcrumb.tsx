"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@ui/breadcrumb";
import { Separator } from "@ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadcrumbItemGenerator = ({
	arrPath,
	item,
	index,
}: { arrPath: string[]; item: string; index: number }) => {
	return (
		<>
			<BreadcrumbItem key={`${item}`}>
				<Link href={index === 1 ? "#" : "/pathname"}>{item}</Link>
			</BreadcrumbItem>
			{index < arrPath.length - 1 && <BreadcrumbSeparator />}
		</>
	);
};

const BreadCrumbComponent = () => {
	const pathname = usePathname() ?? "";
	const arrPath = pathname.split("/").filter(Boolean);
	console.log(arrPath);
	return (
		<>
			<Breadcrumb className="hidden md:flex">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/dashboard">Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{arrPath.length > 0 && <BreadcrumbSeparator />}

					{arrPath.map((item, index) => (
						<BreadcrumbItemGenerator
							key={`${item}`}
							arrPath={arrPath}
							item={item}
							index={index}
						/>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<Separator />
		</>
	);
};

export default BreadCrumbComponent;
