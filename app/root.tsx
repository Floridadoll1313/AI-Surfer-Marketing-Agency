import { Outlet, Scripts, Links, Meta } from "react-router";

export function Layout() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header className="p-4 text-center text-2xl font-bold">
          AI Surfer Marketing Agency
        </header>

        <main>
          <Outlet />
        </main>

        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}