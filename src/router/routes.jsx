import Index from '../pages/Index.jsx'
import NotFoundPage from '../pages/404.jsx'
import SignInPage from '../pages/auth/SignIn.jsx'
import ForgotPage from '../pages/auth/Forgot.jsx'
import Agents from '../pages/agents/Agents.jsx'
import Properties from '../pages/properties/Properties.jsx'
import DashboardLayout from '../layout/DashboardLayout.jsx'
import AgentLayout from '../pages/agents/AgentsLayout.jsx'
import PropertiesLayout from '../pages/properties/PropertiesLayout.jsx'
import CreateAgent from '../pages/agents/create/CreateAgent.jsx'

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
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <Index />,
                index: true
            },
            {
                path: "agents",
                element: <AgentLayout />,
                children: [
                    {
                        path: "",
                        element: <Agents />,
                        index: true
                    },
                    {
                        path: "create",
                        element: <CreateAgent />
                    }
                ]
            },
            {
                path: "properties",
                element: <PropertiesLayout />,
                children: [
                    {
                        path: "",
                        element: <Properties />,
                        index: true
                    },
                    {
                        path: "create",
                        element: <CreateAgent />
                    }
                ]
            },
        ],
    },
    ...authRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
]
