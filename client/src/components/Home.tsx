import { useAuth } from '../contexts/AuthContext';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const {userID} = useAuth();

    useEffect(() => {
        if (!userID) {
            navigate('/login');
        }
    }, [userID, navigate]); // Dependencies for useEffect

    return (
        <div>test</div>
    )
}