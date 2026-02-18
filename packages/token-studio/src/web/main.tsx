import './styles.css';
import ReactDOM from 'react-dom/client';
import {
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { CategoriesPage } from './routes/categories';
import { CategoryEditorPage } from './routes/category-editor';
import { ChangesPage, ChangesProvider } from './routes/changes';
import { SettingsPage } from './routes/settings';

function RootLayout() {
  return (
    <ChangesProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1280px] grid-cols-1 gap-4 p-4 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
          <h1 className="mb-4 text-2xl">Token Studio</h1>
          <nav className="flex flex-col gap-2 text-sm">
            <Link
              to="/categories"
              className="rounded px-3 py-2 hover:bg-[var(--paper)]"
              activeProps={{ className: 'rounded bg-[var(--paper)] px-3 py-2' }}
            >
              Categories
            </Link>
            <Link
              to="/changes"
              className="rounded px-3 py-2 hover:bg-[var(--paper)]"
              activeProps={{ className: 'rounded bg-[var(--paper)] px-3 py-2' }}
            >
              Changes
            </Link>
            <Link
              to="/settings"
              className="rounded px-3 py-2 hover:bg-[var(--paper)]"
              activeProps={{ className: 'rounded bg-[var(--paper)] px-3 py-2' }}
            >
              Settings
            </Link>
          </nav>
        </aside>
        <main className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
          <Outlet />
        </main>
      </div>
    </ChangesProvider>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to="/categories" />,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: CategoriesPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories/$name',
  component: CategoryEditorPage,
});

const changesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/changes',
  component: ChangesPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoriesRoute,
  categoryRoute,
  changesRoute,
  settingsRoute,
]);

const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app');
if (!rootElement) {
  throw new Error('Missing #app root element');
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
