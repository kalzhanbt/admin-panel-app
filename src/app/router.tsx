import { createBrowserRouter, Navigate } from "react-router-dom";
import App from './App';
import { LoginPage } from "@/pages/LoginPage";
import { TruckPage } from "@/pages/TruckPage";
import { TruckDriversPage } from "@/pages/TruckDriversPage";
import PrivateRoute from "@/widgets/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/login" replace /> },
            { path: '/login', element: <LoginPage /> },
            {
                element: <PrivateRoute />,  // Компонент для проверки авторизации
                children: [
                    { path: 'trucks', element: <TruckPage /> },
                    { path: 'truck-drivers', element: <TruckDriversPage /> },
                ],
            },
        ],
    },
]);