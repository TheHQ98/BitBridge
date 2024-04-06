import { CssBaseline } from '@mui/material';
import { Suspense, lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {initializeEvents} from "./utils.tsx";

const HomeView = lazy(() => import('./views/HomeView'));
const RootView = lazy(() => import('./views/RootView'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootView />}>
      <Route index element={<HomeView />} />
    </Route>,
  ),
);

export default function App() {
    initializeEvents();
  return (
    <Suspense>
      <CssBaseline />
      <RouterProvider router={router} />
    </Suspense>
  );
}
