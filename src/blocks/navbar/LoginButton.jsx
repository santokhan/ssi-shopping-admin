import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export const LoginButton = () => {
    const { isAuthenticated, signout } = useAuth();
    const navigate = useNavigate();

    return (
        isAuthenticated ?
            <button
                type="button"
                onClick={() => {
                    signout()
                    navigate("/signin")
                }}
                className={twMerge("px-6 py-2 rounded-full font-medium hover:bg-black/10")}
            >Sign Out</button>
            :
            <Link
                href={"/auth/signin"}
                className={twMerge("px-6 py-2 rounded-full font-medium hover:bg-black/10")}
            >Sign In</Link>
    )
}