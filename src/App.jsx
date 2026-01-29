import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BranchLocatorPage from "./pages/BranchLocatorPage.jsx";
import "./App.css"

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
