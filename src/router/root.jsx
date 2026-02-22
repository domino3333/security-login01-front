
import { createBrowserRouter } from "react-router-dom";
import { Suspense,lazy } from "react";
import Home from "../pages/Home";
import Loading from "../pages/Loading";
import MainPage from "../pages/MainPage";
import AdminHome from "../pages/AdminHome";
import AddProductForm from "../components/AddProductForm";
import LoginForm from "../components/LoginForm";
const root = createBrowserRouter([
{
        path:'/login',
        element:(
            <Suspense fallback={<Loading/>}>
                <LoginForm/>
            </Suspense>
        )
    },

    {
        path:'/admin',
        element:(
            <Suspense fallback={<Loading/>}>
                <AdminHome/>
            </Suspense>
        )
    },
    {
       path:'/MainPage',
        element:(
            <Suspense fallback={<Loading/>}>
                <MainPage/>
            </Suspense>
        ) 

    },
    {
       path:'/admin/product/add',
        element:(
            <Suspense fallback={<Loading/>}>
                <AddProductForm/>
            </Suspense>
        ) 

    }

])

export default root;