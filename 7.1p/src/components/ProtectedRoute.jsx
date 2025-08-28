import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const location = useLocation();
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
    return children;
}
