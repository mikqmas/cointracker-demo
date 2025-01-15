import './App.css'

import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';

export default function App() {
    return (
        <AuthProvider>
          <Login />
        </AuthProvider>
    );
};

