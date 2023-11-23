import { Outlet } from "react-router-dom"
import Nav from "./includes/Nav";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
function Layout() {
    return (
        <>
        <Header />
        <Nav />
        <Outlet />
        <Footer />
        </>
    );
}

export default Layout;