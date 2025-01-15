import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Shared/Card'

export default function WalletsList() {
    const [wallets, setWallets] = useState([]);
    const fetchWallets = async () => {
        const token = localStorage.getItem('token');  // Assuming your token is stored in local storage
        const userID = localStorage.getItem('user_id');  // Assuming your token is stored in local storage

        try {
            const response = await axios.get(`http://localhost:8080/api/users/${userID}/wallets`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setWallets(response.data.wallets);
        } catch (error) {
            alert("Failed to fetch wallets. Please try again.");
            console.error(error)
        }
    };

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <div>
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a>
            </div>
            <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {wallets.map(wallet => <Card info={wallet} />)}
                    </ul>
            </div>
            </div>
        </div>
    )
}
