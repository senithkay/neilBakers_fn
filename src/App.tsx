import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import AllProducts from "./pages/AllProducts/AllProducts";
import AddProducts from "./pages/AddProducts/AddProducts";
import DailyStockUpdate from "./pages/DailyStockUpdate/DailyStockUpdate";
import SignIn from "./pages/Signin/SignIn";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Users from "./pages/Users/Users";
import AddUser from "./pages/AddUser/AddUser";
import DailyStockReport from "./pages/DailyStockReport/DailyStockReport";
import WeeklyStockReport from "./pages/WeekltStockReport/WeeklyStockReport";
import MonthlystockReport from "./pages/MothlyStockReport/MonthlyStockReport";
import ViewProducts from "./pages/ViewProduct/ViewProduct";
import {history} from "./utils/common.ts";
import {useNavigate, useLocation} from "react-router-dom";

function App() {
    const Layout = () => {
        history.navigate = useNavigate();
        history.location = useLocation();
        return (
            <div className="main">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <Navbar />
                    <div className="outlet">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/:id",
                    element: <Dashboard />,
                },
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "/products",
                    element: <AllProducts />,
                },
                {
                    path: "/add-products",
                    element: <AddProducts />,
                },
                {
                    path: "/add-products/:id",
                    element: <ViewProducts />,
                },
                {
                    path: "/daily-stock-update",
                    element: <DailyStockUpdate />,
                },
                {
                    path: "/daily-stock-update/:id",
                    element: <DailyStockUpdate />,
                },
                {
                    path: "daily-stock-report",
                    element: <DailyStockReport />,
                },
                {
                    path: "daily-stock-report/:id",
                    element: <DailyStockReport />,
                },
                {
                    path: "weekly-stock-report",
                    element: <WeeklyStockReport />,
                },
                {
                    path: "weekly-stock-report/:id",
                    element: <WeeklyStockReport />,
                },
                {
                    path: "monthly-stock-report",
                    element: <MonthlystockReport />,
                },
                {
                    path: "monthly-stock-report/:id",
                    element: <MonthlystockReport />,
                },

            ],
        },
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword />,

        },
        {
            path: "/users",
            element: <Users />,
        },
        {
            path: '/add-user',
            element: <AddUser />,

        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;
