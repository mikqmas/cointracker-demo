import {useEffect, Suspense} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Wallets from './Wallets';

function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <p>{error}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

export default function Home() {
    const navigate = useNavigate();
    const {userID} = useAuth();

    useEffect(() => {
        if (!userID) {
            navigate('/login');
        }
    }, [userID, navigate]); // Dependencies for useEffect

    return (
        <div>
            <ErrorBoundary fallback={<ErrorFallback />}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Wallets />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}