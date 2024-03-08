import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import useCurrentUser from "./hooks/useCurrentUser";

const RenderLoadingSpinner = () => (
  <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
    <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-2 h-48 w-48" />
  </div>
);

const PrivateRoute = ({ element }) => {
  const { data, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return <RenderLoadingSpinner />;
  }

  if (error && error.message === 'Unauthorized access. Please log in.') {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return data ? element : <Navigate to="/auth/sign-in" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute
            element={<Dashboard />}
          />
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
