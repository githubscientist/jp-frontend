import { createBrowserRouter } from "react-router";
import App from "../src/App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    }
])