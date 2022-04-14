import React from 'react'
import './App.css';
import theme from './styles/theme';
import AppTheme from './layout/AppTheme';
import AppRouter from './routers/AppRouter'
import './styles/main.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers';
import logger from 'redux-logger';
import initAPI from 'api/api.config';

initAPI();

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: { app: appReducer },
});

function App() {
  return (
    <Provider store={store}>
      <AppTheme theme={theme}>
        <AppRouter/>
      </AppTheme>
    </Provider>
  );
}

export default App;
