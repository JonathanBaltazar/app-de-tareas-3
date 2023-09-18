import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

// COMPONENTES
import ProfileMenu from "./components/ProfileMenu";

function ProtectedRoute() {
    let { isAuthenticated, loading, user } = useContext(AuthContext);

    if (!loading) {
        if (!isAuthenticated && !user) {
            return <Navigate to="/login" />;
        }
    }

    return (
        !loading && (
            <>
                <ProfileMenu />
                <Outlet />
            </>
        )
    );
}

export default ProtectedRoute;
