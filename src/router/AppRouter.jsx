import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";
import { useUser, UserProvider } from "../context/UserContext";

const LoginForm = lazy(() => import("../components/LoginForm"));
const MainPage = lazy(() => import("../pages/MainPage"));
const AdminHome = lazy(() => import("../pages/AdminHome"));
const AddProductForm = lazy(() => import("../components/AddProductForm"));

// 훅은 컴포넌트 안에서만 사용
const ProtectedRouteWrapper = ({ Component }) => {
    const { user } = useUser();
    if (!user) return <Navigate to="/login" />;
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
};

const AdminRouteWrapper = ({ Component }) => {
    const { user } = useUser();
    if (!user || !user.roles.includes("ADMIN")) return <Navigate to="/MainPage" />;
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
};

// 라우터 정의
const AppRouterContent = () => {
    const router = createBrowserRouter([
        { path: "/login", element: <LoginForm /> },
        { path: "/mainPage", element: <ProtectedRouteWrapper Component={MainPage} /> },
        { path: "/admin", element: <AdminRouteWrapper Component={AdminHome} /> },
        { path: "/admin/product/add", element: <AdminRouteWrapper Component={AddProductForm} /> },
    ]);

    return <RouterProvider router={router} />;
};

export default function AppRouter() {
    return (
        <UserProvider>
            <AppRouterContent />
        </UserProvider>
    );
}