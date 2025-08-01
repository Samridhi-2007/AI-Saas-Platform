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
import TodayTaskPage from "@/pages/TodayTaskPage";
import todayTaskLoader from "@/routes/loaders/todayTaskLoader";
import upcomingTaskLoader from "@/routes/loaders/upcomingTaskLoader";
import UpcomingTaskPage from "@/pages/UpcomingTaskPage";
import CompletedTaskPage from "@/pages/CompletedTaskPage";
import completedTaskLoader from "@/routes/loaders/completedTaskLoader";
import { act } from "react";
import projectAction from "@/routes/actions/projectAction";
import ProjectsPage from "@/pages/ProjectsPage";
import projectsLoader from "@/routes/loaders/projectsloader";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import projectDetailLoader from "@/routes/loaders/projectDetailLoader";

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
                
            },
            {
                path: 'today',
                element: <TodayTaskPage/>,
                loader: todayTaskLoader,
            },
            {
                path: 'upcoming',
                element: <UpcomingTaskPage/>,
                loader: upcomingTaskLoader,
            },
                        {
                path: 'completed',
                element: <CompletedTaskPage/>,
                loader: completedTaskLoader,
            },
              {
                path: 'projects',
                element: <ProjectsPage/>,
                action: projectAction,
                loader: projectsLoader,
            },
            {
                path: 'projects/:projectId',
                element: <ProjectDetailPage/>,
                loader: projectDetailLoader,
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