import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Survey from "./pages/survey";
import Login from "./pages/login";
import { useAuth } from "./hook";
import Navbar from "./components/Navbar";
import Admin from "./pages/admin";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (auth.user) {
    return children;
  }

  return <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Survey />,
      },
      { path: "/login", element: <Login /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
