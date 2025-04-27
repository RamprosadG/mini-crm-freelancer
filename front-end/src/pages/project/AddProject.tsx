import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Client {
  id: string;
  name: string;
}

const AddProject: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    budget: '',
    deadline: '',
    status: 'Not Started',
    priority: 'Medium',
    clientId: '',
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    // Fetch all clients
    axios.get('/api/clients')
      .then(res => setClients(res.data))
      .catch(err => console.error('Failed to fetch clients:', err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/projects', {
        ...formData,
        budget: parseFloat(formData.budget),
        deadline: new Date(formData.deadline),
      });
      alert('Project added successfully!');
      setFormData({
        title: '',
        details: '',
        budget: '',
        deadline: '',
        status: 'Not Started',
        priority: 'Medium',
        clientId: '',
      });
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl w-full max-w-xl p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Add New Project
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Budget ($)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Client
              </label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
