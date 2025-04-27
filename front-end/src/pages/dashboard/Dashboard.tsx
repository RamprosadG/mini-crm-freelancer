import React, { JSX } from "react";

interface StatsData {
  label: string;
  value: number;
  icon: JSX.Element;
  bg: string;
}

const DashboardOverview: React.FC = () => {
  const stats: StatsData[] = [
    {
      label: "Total Projects",
      value: 12,
      icon: <i className="fas fa-folder-open text-white text-2xl"></i>,
      bg: "bg-blue-500",
    },
    {
      label: "Total Clients",
      value: 8,
      icon: <i className="fas fa-user-friends text-white text-2xl"></i>,
      bg: "bg-green-500",
    },
    {
      label: "Pending Reminders",
      value: 5,
      icon: <i className="fas fa-bell text-white text-2xl"></i>,
      bg: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-6 rounded-xl shadow-md bg-white dark:bg-gray-800"
          >
            <div>
              <h3 className="text-lg font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.bg}`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
