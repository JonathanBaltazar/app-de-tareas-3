import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

// LOCAL
import { AuthContext } from "../context/AuthContext";

// COMPONENTS
import Button from "../components/Button";

function Home() {
    let { isAuthenticated, loading } = useContext(AuthContext);
    // let navigate = useNavigate();

    // useEffect(() => {
    if (!loading) {
        if (isAuthenticated) {
            return <Navigate to="/tasks" />;
        }
    }

    return (
        <div className="w-11/12 sm:w-10/12 md:w-7/12 lg:w-6/12 m-auto h-screen flex items-center justify-center flex-col">
            <h1 className="text-center text-4xl sm:text-6xl font-medium mb-4">
                Empieza a guardar tus tareas
            </h1>
            <Link to="/login">
                <Button nameButton={"Empezar"} />
            </Link>
        </div>
    );
}

export default Home;
