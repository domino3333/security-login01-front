
import { createBrowserRouter } from "react-router-dom";
import { Suspense,lazy } from "react";
import Home from "../pages/Home";
import Loading from "../pages/Loading";
const root = createBrowserRouter([
    {
        path:'/',
        element:(
            <Suspense fallback={<Loading/>}>
                <Home/>
            </Suspense>
        )
    }
])

export default root;