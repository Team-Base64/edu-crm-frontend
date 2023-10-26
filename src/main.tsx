import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';

async function deferRender() {
    if (process.env.NODE_ENV !== 'mock') {
        return;
    }

    const { worker } = await import('../__mocks__/browserMocks');

    return worker.start();
}

deferRender().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
    );
});
