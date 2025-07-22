/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Router configuration for the app
*/
import { createBrowserRouter }  from "react-router-dom";
import  RootLayout from '@/layouts/RootLayout';
import RegisterPage from "@/pages/RegisterPage";
import RootErrorBoundary from "@/pages/RootErrorBoundary";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import AuthSyncPage from "@/pages/AuthSyncPage";
import AppLayout from "@/layouts/AppLayout";
import InboxPage from "@/pages/InboxPage";
import appAction from '@/routes/actions/appAction';
import inboxTaskLoader from "@/routes/loaders/inboxloader";
// import inboxAction from "@/routes/actions/inboxAction";

// import { RouteObject } from "react-router";


const rootRouteChildren=[
            {
                index:true,
                element:<HomePage/>
            },
            {
                path:'register',
                element: <RegisterPage/>,
            },
            {
                path:'login',
                element: <LoginPage/>,
            },
            {
                path:'auth-sync',
                element:<AuthSyncPage/>
            }
        ];
        const appRouteChildrenn=[
            {
                path:'inbox',
                element:<InboxPage/>,
                loader: inboxTaskLoader,
                // action: inboxAction,
            }
        ]


const router= createBrowserRouter([
    {
        path: '/',
        element:<RootLayout />,
        errorElement:<RootErrorBoundary/>,
        
        children:rootRouteChildren,
    },
    {
        path:'/app',
        element:<AppLayout />,
        children:appRouteChildrenn,
        action: appAction,
    },

]);

function App() {
  return <RouterProvider router={router} />;
}
export default router;