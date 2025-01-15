import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Shared/Card'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'flowbite-react';
import Modal from './Shared/Modal'
import Toast from './Shared/Toast'

export default function Wallets() {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const [wallets, setWallets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchWallets = async () => {
        const token = localStorage.getItem('token'); 
        const userID = localStorage.getItem('user_id'); 

        try {
            const response = await axios.get(`http://localhost:8080/api/users/${userID}/wallets`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLoading(false)
            setWallets(response.data.wallets);
        } catch (error) {
            console.error("Failed to fetch wallets. Please try again.", error);
            if (error.status === 401) {
                logout()
            }
        }
    };

    const handleClick = (address: number) => (e) => {        
        e.preventDefault();
        navigate(`wallets/${address}/transactions`);
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleAddWallet = async (address: string) => {
        const token = localStorage.getItem('token');  
        const userID = localStorage.getItem('user_id'); 
        console.log(address)

        try {
            const response = await axios.post(`http://localhost:8080/api/users/${userID}/wallets`, {address}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response)

            const { message, wallet_id } = response.data;
            if (wallet_id) {
                setWallets([...wallets, {address, wallet_id}])
            } else {
                throw Error(`message: ${message}`)
            }
        } catch (error) {
            setToast(<Toast text={`${error}`}/>)
            setTimeout(() => {setToast(null)}, 3000)
            console.error("Failed to add wallets. Please try again.", error);
        }
    }

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <div>
            {toast != null && toast}
            <Modal show={showModal} handleAddWallet={handleAddWallet} setShowModal={setShowModal}/>
            <Button className='absolute top-4 right-4' color='purple' onClick={logout}>Logout</Button>
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Wallets</h5>
                    <Button color='blue' onClick={toggleModal}>Add Wallet</Button>
            </div>
            {
                <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {wallets.map(wallet => <Card key={wallet.address} info={wallet} handleClick={handleClick} />)}
                        </ul>
                        {loading && <div>loading...</div>}
                </div>
            }
            </div>
        </div>
    )
}
