import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { deleteClient, fetchClients } from '../../redux/features/clients/clientsSlice';
import { Link } from 'react-router-dom';


const Client: React.FC = () => {
  const navigate = useNavigate();
  const clients = useAppSelector((state) => state.clients.clients.data);
  const dispatch = useAppDispatch();
  const userId = String(useAppSelector((state) => state.auth.user?.id));

  useEffect(() => {
      dispatch(fetchClients({userId}))
  }, [dispatch, userId]);

  const handleEdit = (id: string) => {
    navigate(`/client/add-or-update?id=${id}`);
  };

  const handleDetails = (id: string) => {
    navigate(`/client/details?id=${id}`);
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure?')) {
      dispatch(deleteClient({id}));
    }
  };

  return (
    <div className="min-h-screen px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
        <div className="w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <Link
          to="/client/add-or-update" // 👉 change this to your desired route
          className="w-full sm:w-auto px-4 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          New Client
      </Link>
      </div>
      
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 mt-6">
      {clients.length > 0 && clients.map((client) => (
        <div
          key={client.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between border border-gray-100 dark:border-gray-700"
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 truncate">
              {client.name}
            </h3>
            {client.phone && (
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-2">
                📞 <span>{client.phone}</span>
              </p>
            )}
            {client.company && (
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-2">
                🏢 <span>{client.company}</span>
              </p>
            )}
          </div>
          <div className='mt-6 flex justify-between'>
            <div>
          <button
              onClick={() => handleDetails(client.id)}
              className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
            >
              See Details
            </button>
            </div>

          <div className=" flex justify-end gap-2">
            <button
              onClick={() => handleEdit(client.id)}
              className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(client.id)}
              className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
};

export default Client;
