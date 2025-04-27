import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { fetchSingleClient } from '../../redux/features/clients/clientsSlice';


const ClientDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = String(searchParams.get('id'));
  const client = useAppSelector((state) => state.clients.singleClient.data);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSingleClient({id}));
  }, [id, dispatch]);

  if (!id) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Loading client...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Client Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                <strong>Name:</strong> {client?.name}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {client?.email}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                <strong>Phone:</strong> {client?.phone}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                <strong>Company:</strong> {client?.company}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Notes</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">{client?.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
