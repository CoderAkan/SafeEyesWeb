import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import MyCompany from "../pages/MyCompany";
import Notifications from "../pages/Notifications";
import Cameras from "../pages/Cameras";
import Personnel from "../pages/Personnel";
import AuthPage from "../pages/AuthPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'company', // Everything about a company, active and inactive cameras, latest notifications, personnel
                element: <MyCompany />,
            },
            {
                path: 'notifications', // Everything about latest and all-time notifications
                element: <Notifications />,
            },
            {
                path: 'cameras', // Everything about cameras, to see what cameras are catching
                element: <Cameras />,
            },
            {
                path: 'personnel', // Everything about workers, did they come to the work or not, are they wearing their PPE, incidents regarding them and etc.
                element: <Personnel />
            },
            {
                path: 'auth',
                element: <AuthPage />
            }
        ]
    }
])