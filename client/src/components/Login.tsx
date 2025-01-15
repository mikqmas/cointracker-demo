// src/components/Login.js
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, signup, userID } = useAuth();

    useEffect(() => {
        console.log(userID)
        if (userID) {
            navigate("/");
        }
    }, [userID, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = false;
        if (e.nativeEvent.submitter.name == "login") {
            success = await login(username, password);
        } else {
            console.log("signup")
            success = await signup(username, password);
        }
        if (success) {
            alert("success")
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" name="login">Login</button>
            <button type="submit" name="signup">Signup</button>
        </form>
    );
};