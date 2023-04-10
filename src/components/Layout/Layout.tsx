import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <>
            <div className='flex flex-col h-screen justify-between'>
                <Navbar />
                <main className='mb-auto'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}
