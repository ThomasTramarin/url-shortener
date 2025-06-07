import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import SignupPage from "./pages/signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Loading from "./components/Loading";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const { checkAuth, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
