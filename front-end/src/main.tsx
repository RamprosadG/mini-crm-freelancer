import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.ts'
import { injectStore } from './libs/axiosInstance.ts';
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
injectStore(store);

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
