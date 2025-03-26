import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Personal Finace App",
	description:
		"Track your spending, manage your budgets, and visualize your savings with ease.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
