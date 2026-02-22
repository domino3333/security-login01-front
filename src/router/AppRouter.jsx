import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";
import { useUser, UserProvider } from "../context/UserContext";

const LoginForm = lazy(() => import("../components/LoginForm"));
const MainPage = lazy(() => import("../pages/MainPage"));
const AdminHome = lazy(() => import("../pages/AdminHome"));
const AddProductForm = lazy(() => import("../components/AddProductForm"));

// 로그인 필요
const ProtectedRoute = ({ children }) => {
    const { user } = useUser();
    if (!user) return <Navigate to="/login" />;
    return children;
};

// 관리자 전용
const AdminRoute = ({ children }) => {
    const { user } = useUser();
    if (!user || !user.roles.includes("ADMIN")) return <Navigate to="/MainPage" />;
    return children;
};

const AppRouterContent = () => {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: (
                <Suspense fallback={<Loading />}>
                    <LoginForm />
                </Suspense>
            )
        },
        {
            path: "/MainPage",
            element: (
                <Suspense fallback={<Loading />}>
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                </Suspense>
            )
        },
        {
            path: "/admin",
            element: (
                <Suspense fallback={<Loading />}>
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                </Suspense>
            )
        },
        {
            path: "/admin/product/add",
            element: (
                <Suspense fallback={<Loading />}>
                    <AdminRoute>
                        <AddProductForm />
                    </AdminRoute>
                </Suspense>
            )
        }
    ]);

    return <RouterProvider router={router} />;
};

// UserProvider로 감싸기
export default function AppRouter() {
    return (
        <UserProvider>
            <AppRouterContent />
        </UserProvider>
    );
}