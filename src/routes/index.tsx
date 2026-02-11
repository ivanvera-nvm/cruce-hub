import { createFileRoute, redirect } from "@tanstack/react-router";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { getServerSession } from "@/lib/session";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await getServerSession();

    if (!session?.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: Home,
});

function Home() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Skeleton className="h-10 w-48" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden rounded-xl border bg-card p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Secciones</p>
          <Separator className="my-3" />
          <nav className="space-y-2 text-sm">
            <p className="font-medium">Inicio</p>
            <p className="text-muted-foreground">Docs (próximo)</p>
            <p className="text-muted-foreground">Integraciones (próximo)</p>
          </nav>
        </aside>

        <Card>
          <CardHeader>
            <CardTitle>Bienvenido a CRUCE Hub</CardTitle>
            <CardDescription>
              Base privada preparada para documentación dinámica e integraciones. Sesión activa para {session?.user.email}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Próximo paso: conectar `/docs` y `/docs/$slug` contra GitLab con TanStack Query.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
