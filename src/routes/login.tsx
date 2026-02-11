import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { getServerSession } from "@/lib/session";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const session = await getServerSession();

    if (session?.user) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "No se pudo iniciar sesión con Google.");
      }
    } catch {
      setError("Error inesperado al iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-6xl items-center px-4 py-8">
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <section className="hidden flex-col justify-center rounded-xl border bg-card p-8 lg:flex">
          <p className="text-sm font-semibold text-primary">CRUCE Hub</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Documentación privada, centralizada y lista para AI.</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Accede con tu cuenta corporativa para navegar docs dinámicas y usar herramientas MCP.
          </p>
        </section>

        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>Solo miembros autorizados de CRUCE pueden ingresar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button type="button" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? "Redirigiendo..." : "Ingresar con Google"}
            </Button>
            <Separator />
            <p className="text-xs text-muted-foreground">
              El registro público está desactivado. Si necesitas acceso, solicita alta manual al administrador.
            </p>
            {error ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
