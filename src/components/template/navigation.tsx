"use client";
import { cn, getCurrentPeriode } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
	{ label: "Dashboard", url: "/" },
	{ label: "Master", url: "/master" },
	{ label: "Rekening", url: `/rekening/${getCurrentPeriode()}` },
];

const NavigationComponent = () => {
	const pathname = usePathname();
	const page = pathname.split("/")[1];

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{menuList.map((item) => (
					<NavigationMenuItem key={item.url}>
						<Link href={item.url} legacyBehavior passHref>
							<NavigationMenuLink
								className={cn(
									navigationMenuTriggerStyle(),
									page === item.url.split("/")[1] &&
										"bg-primary text-primary-foreground",
								)}
							>
								{item.label}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavigationComponent;
