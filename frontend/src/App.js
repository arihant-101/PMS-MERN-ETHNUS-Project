import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Task from './components/Task';
import Login from './components/login';
import Signup from './components/signup';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
  };

  const isSignupRoute = location.pathname === '/signup';

  if (!isLoggedIn && isSignupRoute) {
    return <Signup />;
  }

  if (!isLoggedIn) {
    return <Login onSuccessfulLogin={handleSuccessfulLogin} />;
  }

  return (
    <AppLayout>
      <Toaster position="top-right" gutter={8} />
      <Routes>
        <Route path="/:projectId" element={<Task />} />
        <Route path="/" element={
          <div className="flex flex-col items-center w-full pt-10">
            <img src="./image/welcome.svg" className="w-5/12" alt="" />
            <h1 className="text-lg text-gray-600">Select or create new project</h1>
          </div>
        } />
      </Routes>
    </AppLayout>
  );
}

export default App;
