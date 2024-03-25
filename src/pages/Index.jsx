import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Dashboard from "../layout/Dashboard";
import { useEffect } from "react";

const Index = () => {
    const { isAuthenticated } = useAuth();
    const authorized = isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorized) {
            navigate("/signin");
        }
    }, [authorized, navigate])

    return (
        authorized &&
        <Dashboard />
    );
};

export default Index;
