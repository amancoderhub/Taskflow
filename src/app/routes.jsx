import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Board from "../pages/Board";
import ProtectedRoute from "../components/ProtectedRoute";

export const routes = [
  { path: "/", element: <Navigate to="/board" replace /> },
  { path: "/login", element: <Login /> },
  {
    path: "/board",
    element: (
      <ProtectedRoute>
        <Board />
      </ProtectedRoute>
    ),
  },
];
