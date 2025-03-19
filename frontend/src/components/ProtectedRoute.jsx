import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = ({ allowedRoles }) => {
    const user = useAuthStore((state) => state.user);

    if(!user) {
        return <Navigate to='/login' />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to='/unauthorized' />;
    }

    return <Outlet />;
}