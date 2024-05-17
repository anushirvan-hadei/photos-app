import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/home/HomePage.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import ImageDetailsPage from "./pages/image-details/ImageDetailsPage.tsx";

const router = createBrowserRouter([
    { path: "/", element: <HomePage/> },
    { path: "/:id", element: <ImageDetailsPage/> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
