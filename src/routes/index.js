import React from 'react';
import { Navigate, useRoutes } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

const routeConfig = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                exact: true,
                element: <Navigate to={"/recommend"} />
            },
            {
                path: "/recommend",
                element: <Recommend />
            },
            {
                path: "/singers",
                element: <Singers />
            },
            {
                path: "/rank",
                element: <Rank />
            }
        ]
    }
]

const MyRouter = () => {
    let element = useRoutes(routeConfig)
    return element
}
export default MyRouter