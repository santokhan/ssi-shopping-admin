import { Heart, Home2, People, TrendUp } from 'iconsax-react';
import React from 'react';

const Notification = () => {
    const notifications = [
        {
            title: 'Your listing House on the beverly hills has been approved',
            icon: <Home2 className="h-5 w-5" />
        },
        {
            title: 'Your listing House on the beverly hills has been approved',
            icon: <Heart className="h-5 w-5" />
        },
        {
            title: 'Your listing House on the beverly hills has been approved',
            icon: <TrendUp className="h-5 w-5" />
        },
        {
            title: 'Your listing House on the beverly hills has been approved',
            icon: <People className="h-5 w-5" />
        },
    ]

    return (
        <div className="rounded-xl bg-white p-4 sm:p-6 lg:p-8 space-y-4 mt-8 shadow">
            <div className="text-md font-semibold text-gray-700">Notifications</div>
            <div className="space-y-3">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            {notification.icon}
                        </div>
                        <p className="text-gray-800">{notification.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
