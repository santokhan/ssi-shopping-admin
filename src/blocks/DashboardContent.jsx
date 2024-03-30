import Notification from "../blocks/activities/RecentActivities";
import StatusCard from "../blocks/status/StatusCard";

const DashboardContent = () => {
    return (
        <div className="">
            <div className="">
                <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900">Howdy, Arshad!</h3>
                <p className="text-base text-gray-700 lg:mt-2 font-medium">We are glad to see you again!</p>
            </div>

            <StatusCard />
            <Notification />
        </div>
    )
}

export default DashboardContent;