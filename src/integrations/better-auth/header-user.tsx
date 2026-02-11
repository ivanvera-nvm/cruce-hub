import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-8 w-24" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{session.user.email}</span>
        <Button type="button" variant="outline" size="sm" onClick={() => authClient.signOut()}>
          Salir
        </Button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
    >
      Ingresar
    </Link>
  );
}
