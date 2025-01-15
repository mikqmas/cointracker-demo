// src/components/Login.js
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Toast from './Shared/Toast';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, signup, userID } = useAuth();
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (userID) {
            navigate("/");
        }
    }, [userID, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success = {result: false, message: ''};
        if (e.nativeEvent.submitter.name == "login") {
            success = await login(username, password);
        } else {
            success = await signup(username, password);
        }
        if (success.result) {
            navigate('/');
        } else {
            setToast(<div className='absolute bottom-5 left-1/2 transform -translate-x-1/2'><Toast text={success.message.message}/></div>)
            setTimeout(() => {setToast(null)}, 3000)
        }
    };

    return (
        <div>
            {toast != null && toast}
            <Card className="max-w-sm">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput id="username" type="text" placeholder="sam" onChange={(e) => setUsername(e.target.value)} required  />
                    </div>
                    <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password" />
                    </div>
                    <TextInput id="password1" type="password" onChange={(e) => setPassword(e.target.value)} required  />
                    </div>
                    <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button color='success' type="submit" name="login">Login</Button>
                    <Button color="blue" type="submit" name="signup">Signup</Button>
                </form>
            </Card>
        </div>
            
    );
};