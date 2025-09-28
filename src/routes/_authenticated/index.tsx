import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: AuthenticatedRoute,
});

function AuthenticatedRoute() {
  return <div className="App">Hello from authenticated home page!</div>;
}
