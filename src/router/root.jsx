import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import Loading from "../pages/Loading";

const LoginForm = lazy(() => import("../components/LoginForm"));
const MainPage = lazy(() => import("../pages/MainPage"));
const AdminHome = lazy(() => import("../pages/AdminHome"));
const AddProductForm = lazy(() => import("../components/AddProductForm"));

// 로그인만 필요
const ProtectedRoute = ({ children, user }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
};

// 관리자 전용
const AdminRoute = ({ children, user }) => {
    if (!user || !user.roles.includes("ADMIN")) return <Navigate to="/MainPage" />;
    return children;
};

export default function AppRouter() {
    const [user, setUser] = useState(null);

    // 로그인 후 서버에서 권한/정보 가져오기
    useEffect(() => {
        fetch("http://localhost:8080/api/give/me/admin", {
            method: "GET",
            credentials: "include", // 쿠키 전송
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    const router = createBrowserRouter([
        {
            path: "/login",
            element: (
                <Suspense fallback={<Loading />}>
                    <LoginForm setUser={setUser} />
                </Suspense>
            )
        },
        {
            path: "/MainPage",
            element: (
                <Suspense fallback={<Loading />}>
                    <ProtectedRoute user={user}>
                        <MainPage />
                    </ProtectedRoute>
                </Suspense>
            )
        },
        {
            path: "/admin",
            element: (
                <Suspense fallback={<Loading />}>
                    <AdminRoute user={user}>
                        <AdminHome />
                    </AdminRoute>
                </Suspense>
            )
        },
        {
            path: "/admin/product/add",
            element: (
                <Suspense fallback={<Loading />}>
                    <AdminRoute user={user}>
                        <AddProductForm />
                    </AdminRoute>
                </Suspense>
            )
        }
    ]);

    return router;
}