import { Link } from "@tanstack/react-router";

import BetterAuthHeader from "../integrations/better-auth/header-user";

export default function Header() {
	return (
		<header className="border-b border-neutral-200 bg-white">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
				<div className="flex items-center gap-4">
					<Link to="/" className="text-sm font-semibold tracking-tight">
						CRUCE Hub
					</Link>
					<nav className="flex items-center gap-3 text-sm text-neutral-600">
						<Link to="/" activeProps={{ className: "text-neutral-900" }}>
							Inicio
						</Link>
					</nav>
				</div>
				<BetterAuthHeader />
			</div>
		</header>
	);
}
