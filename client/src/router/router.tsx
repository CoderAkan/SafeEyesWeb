import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import Notifications from "../pages/Notifications";
import Cameras from "../pages/Cameras";
import Personnel from "../pages/Personnel";
import AuthPage from "../pages/AuthPage";
import AboutUs from "../pages/AboutUs";
import Partners from "../pages/Partners";
import Accomplishments from "../pages/Accomplishments";
import Settings from "../pages/Settings";
import FireLogs from "../pages/Incidents/FireLogs";
import PPELogs from "../pages/Incidents/PPELogs";
import PhoneLogs from "../pages/Incidents/PhoneLogs";

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
                path: 'dashboard', // Everything about a company, active and inactive cameras, latest notifications, personnel
                element: <Dashboard />,
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
                path: 'workers', // Everything about workers, did they come to the work or not, are they wearing their PPE, incidents regarding them and etc.
                element: <Personnel />
            },
            {
                path: 'auth',
                element: <AuthPage />
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'partners',
                element: <Partners />
            },
            {
                path: 'accomplishments',
                element: <Accomplishments />
            },
            {
                path: 'settings',
                element: <Settings />
            },
            {
                path: 'fire',
                element: <FireLogs />
            },

            {
                path: 'ppe',
                element: <PPELogs />
            },
            {
                path: 'phone',
                element: <PhoneLogs />
            },
        ]
    }
])