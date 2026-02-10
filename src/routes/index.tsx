import { createFileRoute, Navigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return (
			<main className="mx-auto max-w-6xl px-4 py-10">
				<p className="text-sm text-neutral-500">Validando sesion...</p>
			</main>
		);
	}

	if (!session?.user) {
		return <Navigate to="/login" />;
	}

	return (
		<main className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-2xl font-semibold tracking-tight">CRUCE Hub</h1>
			<p className="mt-2 text-sm text-neutral-600">
				Base limpia lista para documentacion privada, integraciones y VTEX Brain.
			</p>
		</main>
	);
}
