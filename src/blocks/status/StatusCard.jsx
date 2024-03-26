import { Heart, Home2, People, TrendUp } from 'iconsax-react';
import React from 'react';

const Card = ({ property }) => {
    const { title, amount, icon } = property
    return (
        <div className="flex min-w-[260px] flex-1 items-center justify-between gap-8 rounded-lg bg-white p-4 sm:p-6 lg:p-8 shadow">
            <div>
                <p className="mt-0.5 line-clamp-1 text-lg">{title}</p>
                <h2 className="line-clamp-1 text-4xl font-bold text-slate-900">{amount}</h2>
            </div>
            <div className="">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-slate-50 p-0 font-medium">
                    {icon}
                </div>
            </div>
        </div>
    );
};

const StatusCard = () => {
    const items = [
        {
            title: 'All Properties',
            amount: 583,
            icon: <Home2 className="h-10 w-10" />
        },
        {
            title: 'All Properties',
            amount: 583,
            icon: <Heart className="h-10 w-10" />
        },
        {
            title: 'All Properties',
            amount: 583,
            icon: <TrendUp className="h-10 w-10" />
        },
        {
            title: 'All Properties',
            amount: 583,
            icon: <People className="h-10 w-10" />
        },
    ]

    return (
        <div className="flex flex-wrap gap-4 mt-10">
            {items.map((property, index) => (
                <Card key={index} property={property} />
            ))}
        </div>
    );
};

export default StatusCard;
