import Link from "next/link";

export default function IndexPage() {
	return (
		<main>
			<h1>Hello</h1>
			<Link href={{ pathname: "/howto" }}>Go to Howto page</Link>
		</main>
	);
}
