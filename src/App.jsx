import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BranchLocatorPage from "./pages/BranchLocatorPage.jsx";

function App() {

    const router = createBrowserRouter(
            [
                {path: "/", Component: BranchLocatorPage},
            ]
    )

  return (
        <RouterProvider router={router} />
  )
}

export default App
