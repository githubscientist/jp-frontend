import './App.css'

import { Outlet, useLoaderData } from 'react-router';
import { Toaster } from 'react-hot-toast';

function App() {
  // user context passed from loader
  const user = useLoaderData();
  return (
    <>
      <Toaster position="top-right" />
      <Outlet context={user} />
    </>
  );
}

export default App
