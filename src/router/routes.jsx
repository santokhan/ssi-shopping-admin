import Index from '../pages/Index.jsx'
import NotFoundPage from '../pages/404.jsx'
import SignInPage from '../pages/SignIn.jsx'

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
        element: <Index />
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
            ...authRoutes
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]
