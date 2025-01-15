import './App.css'

import { AuthProvider } from './contexts/AuthContext';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';  // Your home component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)

export default function App() {
  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
};

