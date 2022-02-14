import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loader from "./components/common/loader";
import AdminBasedRoute from "./routing/adminRoute";

const DefaultLayout = lazy(
  () => import("./components/containers/defaultLayout")
);
const AdminLayout = lazy(() => import("./components/containers/adminLayout"));

const HomePage = lazy(() => import("./components/home"));
const NewsCreate = lazy(() => import("./components/admin/news/create"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <DefaultLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <AdminBasedRoute />
            </Suspense>
          }
        >
          <Route
            path="/admin/"
            element={
              <Suspense fallback={<Loader />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              path="/admin/news/create"
              element={
                <Suspense fallback={<Loader />}>
                  <NewsCreate />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
