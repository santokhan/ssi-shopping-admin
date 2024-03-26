import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import DashboardLayout from "../layout/DashboardLayout";
import { useEffect } from "react";
import DashboardContent from "../blocks/DashboardContent";

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
        <DashboardLayout>
            <DashboardContent />
        </DashboardLayout>
    );
};

export default Index;
