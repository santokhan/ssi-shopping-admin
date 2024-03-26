import { twMerge } from "tailwind-merge";
import NavBar from "../blocks/navbar/NavBar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

    function onSidebarToggle() {
        setSidebarIsOpen(!sidebarIsOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            const isSmaller = window.innerWidth < 992
            setSidebarIsOpen(!isSmaller);
        };

        // Initial check
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run effect only once

    return (
        <main className="bg-white">
            {/* Navbar */}
            <nav className={twMerge(
                "h-16",
                "sticky top-0 left-0 z-[2]",
                "bg-white p-4",
                "flex items-center",

            )}><NavBar onSidebarToggle={onSidebarToggle} sidebarIsOpen={sidebarIsOpen} /></nav>

            <div className="flex">
                {/* Sidebar */}
                {
                    sidebarIsOpen &&
                    <aside className={twMerge(
                        "w-60 flex-shrink-0",
                        "sticky top-16 left-0 h-[calc(100svh_-_64px)] overflow-y-auto z-[1]",
                        "p-4",
                    )}><Sidebar /></aside>
                }

                {/* Dashboard Content */}
                <div className="flex-grow w-full min-h-screen p-4 lg:p-8 bg-gray-50 rounded-2xl overflow-x-hidden">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;
