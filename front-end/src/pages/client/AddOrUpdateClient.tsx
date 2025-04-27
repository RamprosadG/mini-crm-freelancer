import React, { useEffect, useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { addClient, fetchSingleClient, updateClient } from '../../redux/features/clients/clientsSlice';

interface ClientFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

const AddOrUpdateClient: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  const dispatch = useAppDispatch();
  const userId = String(useAppSelector((state) => state.auth.user?.id));
  const singleClient = useAppSelector((state) => state.clients.singleClient.data);

  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Simulate fetching data for update
  useEffect(() => {
    if (id) {
        dispatch(fetchSingleClient({id}));
        setIsLoading(false);
    }
  }, [id, dispatch]);
  
  useEffect(() => {
    if(singleClient) {
      const data: ClientFormData = {
        ...singleClient,
      }
       setFormData(data);
    }
  }, [dispatch, singleClient])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateClient({...formData, id}));
    } else {
      dispatch(addClient({...formData, userId}))
    }

    navigate('/client');
  };

  return (
    <div className="flex items-center justify-center px-2: md:px-4">
      <div className="shadow-md rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">
          {id ? 'Update Client' : 'Add New Client'}
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
            >
              {id ? 'Update Client' : 'Add Client'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddOrUpdateClient;
