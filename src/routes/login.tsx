import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const { data: session, isPending } = authClient.useSession();
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);

	if (isPending) {
		return (
			<main className="mx-auto max-w-md px-4 py-16">
				<p className="text-sm text-neutral-500">Validando sesion...</p>
			</main>
		);
	}

	if (session?.user) {
		return <Navigate to="/" />;
	}

	async function handleGoogleSignIn() {
		setError("");
		setLoading(true);

		try {
			const result = await authClient.signIn.social({
				provider: "google",
				callbackURL: "/",
			});

			if (result.error) {
				setError(result.error.message || "No se pudo iniciar sesion con Google.");
			}
		} catch {
			setError("Error inesperado al iniciar sesion con Google.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="mx-auto max-w-md px-4 py-16">
			<div className="rounded-lg border border-neutral-200 bg-white p-6">
				<h1 className="text-lg font-semibold tracking-tight">Acceso CRUCE Hub</h1>
				<p className="mt-1 text-sm text-neutral-600">
					Solo miembros autorizados de CRUCE pueden ingresar.
				</p>

				<div className="mt-6 space-y-4">
					<button
						type="button"
						onClick={handleGoogleSignIn}
						disabled={loading}
						className="h-10 w-full rounded bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
					>
						{loading ? "Redirigiendo..." : "Ingresar con Google"}
					</button>

					{error ? (
						<p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
							{error}
						</p>
					) : null}
				</div>
			</div>
		</main>
	);
}
