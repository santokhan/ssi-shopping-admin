import { twMerge } from "tailwind-merge";
import NavBar from "../blocks/navbar/NavBar";

export const Sidebar = () => {
    return (
        <h1 className="text-xl">Sidebar Container</h1>
    )
}

export const DashboardContent = () => {
    return (
        <p className="text-xl">Dashboard Content</p>
    )
}

const Dashboard = () => {
    return (
        <main className="">
            {/* Navbar */}
            <nav className={twMerge(
                "h-16 border-b",
                "sticky top-0 left-0 z-[1]",
                "bg-white p-4",
                "flex items-center"
            )}><NavBar /></nav>

            <div className="flex divide-x">
                {/* Sidebar */}
                <aside className={twMerge(
                    "w-60 flex-shrink-0",
                    "sticky top-16 left-0 h-full overflow-y-auto z-[1]",
                    "bg-white p-4"
                )}><Sidebar /></aside>

                {/* Dashboard Content */}
                <div className="flex-grow  min-h-screen p-4">
                    <DashboardContent />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
