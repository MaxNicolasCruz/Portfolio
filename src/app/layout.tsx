import type { Metadata } from "next";
import "./globals.css";
import BgComponent from "@/components/bgDynamic/BgComponent";

export const metadata: Metadata = {
	title: "Cruz Max Nicolas Portfolio",
	description: "Portfolio by Nico Cruz",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scrollbar-hide" id="html">
			<body className="font-mogra">
				<BgComponent>{children}</BgComponent>
			</body>
		</html>
	);
}
