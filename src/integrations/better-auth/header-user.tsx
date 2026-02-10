import { Link } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export default function BetterAuthHeader() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <div className="h-8 w-20 animate-pulse rounded bg-neutral-100" />;
	}

	if (session?.user) {
		return (
			<div className="flex items-center gap-3">
				<span className="text-xs text-neutral-600">{session.user.email}</span>
				<button
					type="button"
					onClick={() => authClient.signOut()}
					className="h-8 rounded border border-neutral-300 px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
				>
					Salir
				</button>
			</div>
		);
	}

	return (
		<Link
			to="/login"
			className="inline-flex h-8 items-center rounded border border-neutral-300 px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
		>
			Ingresar
		</Link>
	);
}
