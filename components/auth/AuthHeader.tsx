import Image from "next/image";

export function AuthHeader() {
	return (
		<header className="bg-grey-900 h-[7vh] flex justify-center items-center rounded-b-lg">
			<Image
				src={"/images/logo/logo-large.svg"}
				alt="Logo"
				width={122}
				height={22}
				quality={80}
				loading="lazy"
			/>
		</header>
	);
}
