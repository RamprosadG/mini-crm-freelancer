/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

type Status = 'Not Started' | 'In Progress' | 'Completed';
type Priority = 'Low' | 'Medium' | 'High';

interface Project {
  id: string;
  title: string;
  details: string;
  budget: number;
  deadline: string;
  status: Status;
  priority: Priority;
  client: string;
}

const statusOptions: Status[] = ['Not Started', 'In Progress', 'Completed'];
const priorityOptions: Priority[] = ['Low', 'Medium', 'High'];
const clientOptions: string[] = ['Client A', 'Client B', 'Client C'];

const ProjectDetails: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [editingField, setEditingField] = useState<keyof Project | null>(null);
  const [editedValue, setEditedValue] = useState<any>(null);

  useEffect(() => {
    // Mock fetch project from backend
    const mockProject: Project = {
      id: '1',
      title: 'Website Redesign',
      details: 'Update UI, UX, and deploy new branding',
      budget: 5000,
      deadline: '2025-05-15',
      status: 'In Progress',
      priority: 'High',
      client: 'Client A',
    };
    setProject(mockProject);
  }, []);

  const handleFieldClick = (field: keyof Project) => {
    setEditingField(field);
    setEditedValue(project?.[field]);
  };

  const handleSave = async () => {
    if (!project || editingField === null) return;

    const updatedProject = { ...project, [editingField]: editedValue };
    setProject(updatedProject);
    setEditingField(null);

    // TODO: Replace with actual API call
    console.log('Saving to DB:', updatedProject);
  };

  const renderEditableField = (field: keyof Project) => {
    const isEditing = editingField === field;

    const commonInputClass =
      'px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 w-full';

    if (!project) return null;

    const value = project[field];

    const renderDropdown = (options: string[]) => (
      <>
        <select
          className={commonInputClass}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
      </>
    );

    if (isEditing) {
      switch (field) {
        case 'status':
          return renderDropdown(statusOptions);
        case 'priority':
          return renderDropdown(priorityOptions);
        case 'client':
          return renderDropdown(clientOptions);
        case 'budget':
          return (
            <>
              <input
                type="number"
                value={editedValue}
                onChange={(e) => setEditedValue(parseFloat(e.target.value))}
                className={commonInputClass}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          );
        case 'deadline':
          return (
            <>
              <input
                type="date"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className={commonInputClass}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          );
        case 'title':
        case 'details':
          return (
            <>
              <input
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className={commonInputClass}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          );
        default:
          return <span>{value}</span>;
      }
    }

    return (
      <span
        className="cursor-pointer hover:underline"
        onClick={() => handleFieldClick(field)}
      >
        {value}
      </span>
    );
  };

  if (!project) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow rounded-lg text-gray-800 dark:text-gray-100 space-y-5">
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>

      <div className="space-y-4">
        <div>
          <label className="font-medium">Title</label>
          <div>{renderEditableField('title')}</div>
        </div>

        <div>
          <label className="font-medium">Details</label>
          <div>{renderEditableField('details')}</div>
        </div>

        <div>
          <label className="font-medium">Budget ($)</label>
          <div>{renderEditableField('budget')}</div>
        </div>

        <div>
          <label className="font-medium">Deadline</label>
          <div>{renderEditableField('deadline')}</div>
        </div>

        <div>
          <label className="font-medium">Status</label>
          <div>{renderEditableField('status')}</div>
        </div>

        <div>
          <label className="font-medium">Priority</label>
          <div>{renderEditableField('priority')}</div>
        </div>

        <div>
          <label className="font-medium">Client</label>
          <div>{renderEditableField('client')}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
