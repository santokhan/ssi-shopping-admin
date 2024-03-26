import { twMerge } from "tailwind-merge";
import NavBar from "../blocks/navbar/NavBar";
import Sidebar from "./Sidebar";
import DashboardContent from "./DashboardContent";
import { useState } from "react";

const Dashboard = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    function onSidebarToggle() {
        setSidebarIsOpen(!sidebarIsOpen);
    }

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
                <aside className={twMerge(
                    "w-60 flex-shrink-0",
                    "sticky top-16 left-0 h-[calc(100svh_-_64px)] overflow-y-auto z-[1]",
                    "p-4",
                    sidebarIsOpen ? "" : "hidden"
                )}><Sidebar /></aside>

                {/* Dashboard Content */}
                <div className="flex-grow min-h-screen p-8 bg-gray-50 rounded-2xl">
                    <DashboardContent />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
