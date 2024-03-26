import Index from '../pages/Index.jsx'
import NotFoundPage from '../pages/404.jsx'
import SignInPage from '../pages/SignIn.jsx'
import ForgotPage from '../pages/auth/Forgot.jsx'
import Agents from '../pages/Agents.jsx'

const authRoutes = [
    {
        path: "signin",
        element: <SignInPage />
    },
    {
        path: "signup",
        element: <Index />
    },
    {
        path: "verify",
        element: <Index />
    },
    {
        path: "forgot",
        element: <ForgotPage />
    },
]

export const routes = [
    {
        path: "/",
        children: [
            {
                path: "",
                element: <Index />,
                index: true
            },
            {
                path: "agents",
                element: <Agents />,
                index: true
            },
            ...authRoutes
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]
