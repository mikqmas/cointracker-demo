import './App.css'

import { AuthProvider } from './contexts/AuthContext';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Transactions from './components/Transactions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="wallets/:address/transactions/" element={<Transactions />} />
    </Route>
  )
)

export default function App() {
  return (
    <AuthProvider>
      <div>CoinTrackerDemo</div>
        <RouterProvider router={router} />
    </AuthProvider>
);
};

