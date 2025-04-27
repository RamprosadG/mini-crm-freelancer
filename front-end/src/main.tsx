import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Provider } from 'react-redux'
import store from './redux/store/store.ts'
import { injectStore } from './libs/axiosInstance.ts';
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
injectStore(store);

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <div className='min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white'>
        <RouterProvider router={router}></RouterProvider>
    </div>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
