import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@ui/navigation-menu";
import Link from "next/link";

const menuList = [
	{ label: "Dashboard", url: "/" },
	{ label: "Master", url: "/master" },
	{ label: "Rekening", url: "/rekening" },
];

const NavigationComponent = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{menuList.map((item) => (
					<NavigationMenuItem key={item.url}>
						<Link href={item.url} legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
