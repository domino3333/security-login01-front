
import { createBrowserRouter } from "react-router-dom";
import { Suspense,lazy } from "react";
import Home from "../pages/Home";
import Loading from "../pages/Loading";
import MainPage from "../pages/MainPage";
const root = createBrowserRouter([
    {
        path:'/',
        element:(
            <Suspense fallback={<Loading/>}>
                <Home/>
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

    }

])

export default root;