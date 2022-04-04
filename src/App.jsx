import React from 'react'
import './App.css';
import theme from './styles/theme';
import AppTheme from './layout/AppTheme';
import AppRouter from './routers/AppRouter'
import './styles/main.css'

function App() {
  return (
    <AppTheme theme={theme}>
      <AppRouter/>
    </AppTheme>
  );
}

export default App;
