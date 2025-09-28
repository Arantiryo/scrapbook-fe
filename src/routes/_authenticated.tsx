import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  async beforeLoad({ context: { auth } }) {
    if (!auth?.isAuthenticated) {
      throw redirect({ to: "/login", search: { redirect: "" } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello from authenticated route!
      <Outlet />
    </div>
  );
}
