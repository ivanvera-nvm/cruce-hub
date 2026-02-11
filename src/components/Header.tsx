import { Link } from "@tanstack/react-router";

import ThemeToggle from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import BetterAuthHeader from "@/integrations/better-auth/header-user";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            CRUCE Hub
          </Link>
          <Badge className="text-muted-foreground">MVP privado</Badge>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <BetterAuthHeader />
        </div>
      </div>
    </header>
  );
}
