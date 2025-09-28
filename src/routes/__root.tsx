import type { SupabaseAuthState } from "@/components/auth/supabase";
import {
  // createRootRoute,
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<{
  auth: SupabaseAuthState | undefined;
}>()({ component: RootLayout });
