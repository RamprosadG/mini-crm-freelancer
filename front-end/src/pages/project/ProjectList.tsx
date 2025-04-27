import React, { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  budget: number;
  deadline: string;
  status: string;
  priority: string;
  client: {
    id: string;
    name: string;
  };
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: '1',
        title: 'Website Redesign',
        budget: 5000,
        deadline: '2025-06-15',
        status: 'In Progress',
        priority: 'High',
        client: {
          id: '101',
          name: 'Acme Corp',
        },
      },
      {
        id: '2',
        title: 'Mobile App Development',
        budget: 12000,
        deadline: '2025-07-10',
        status: 'Not Started',
        priority: 'Medium',
        client: {
          id: '102',
          name: 'Globex Inc',
        },
      },
      {
        id: '3',
        title: 'SEO Optimization',
        budget: 3000,
        deadline: '2025-05-30',
        status: 'Completed',
        priority: 'Low',
        client: {
          id: '103',
          name: 'Initech',
        },
      },
    ];

    setProjects(sampleProjects);
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Project List</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Client: <span className="font-medium">{project.client?.name}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Budget: ${project.budget.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 rounded-full">
                {project.status}
              </span>
              <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 rounded-full">
                {project.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
