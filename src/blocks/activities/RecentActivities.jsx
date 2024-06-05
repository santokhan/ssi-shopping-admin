import React, { useEffect, useState } from 'react';
import useAxios from '../../context/useAxios';
import formatDate from '../../utils/formatDate';

const Notification = () => {
  const activitiesPlaceholder = [
    'You have created a new user account',
    'You have updated your profile information',
    'You have deleted a post',
    'You have added a new comment',
    'You have uploaded a profile picture',
    'You have changed your password',
    'You have subscribed to a newsletter',
    'You have unsubscribed from email notifications',
    'You have joined a new group',
    'You have left a group',
  ];
  const [activities, setActivities] = useState([]);
  const { api } = useAxios();

  useEffect(() => {
    api
      .get('activities/')
      .then(({ data }) => {
        if (data) {
          setActivities(data);
        }
      })
      .catch((err) => {
        setActivities(activitiesPlaceholder);
      });
  }, []);

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 lg:p-8 space-y-4 mt-8 shadow">
      <div className="text-xl font-bold text-gray-700">Recent Activity</div>
      <div className="relative">
        <aside className="border-l-2 absolute left-[5px] top-0 bottom-0 border-dark-blue-500/50"></aside>
        <ul className="space-y-3 relative">
          {Array.isArray(activities.results) &&
            activities.results
              .slice(0, 12)
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((_, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <div className="flex size-3 shrink-0 items-center justify-center rounded-lg border-2 bg-white border-dark-blue-500"></div>
                  {_.action && (
                    <p className="text-gray-800">
                      <span>{_.action}</span>
                      {_.user?.first_name && (
                        <span>
                          {' '}
                          by {_.user.first_name} {_.user.first_name}
                        </span>
                      )}
                      {_.timestamp && (
                        <time> on {formatDate(_.timestamp)}</time>
                      )}
                    </p>
                  )}
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};

export default Notification;
