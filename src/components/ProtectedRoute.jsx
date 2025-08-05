import { Navigate, useOutletContext } from "react-router";

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = useOutletContext();

    // Redirect to login if the user is not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // check the role of the user is authorized
    if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

        if (!roles.includes(user.role)) {
            return <Navigate to="/" replace />; // Redirect to home if the user does not have the required role
        }
    }

    return children;
}

export default ProtectedRoute;