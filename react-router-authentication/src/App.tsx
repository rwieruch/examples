import { createContext, useContext, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router";

const fakeAuth = (): Promise<string> =>
  new Promise((resolve) => {
    setTimeout(() => resolve("2342f2f1d131rf12"), 250);
  });

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

const AuthContext = createContext<{
  token: string;
  onLogin: () => void;
  onLogout: () => void;
}>({
  token: "",
  onLogin: () => {},
  onLogout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState("");

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);

    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleLogout = () => {
    setToken("");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

const Home = () => {
  const { onLogin } = useAuth();

  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};

const Admin = () => {
  return (
    <>
      <h2>Admin (Protected)</h2>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

const App = () => {
  return (
    <AuthProvider>
      <h1>React Router</h1>

      <Navigation />

      <Routes>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
};

const Navigation = () => {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/admin">Admin</Link>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default App;
