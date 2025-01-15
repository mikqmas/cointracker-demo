import { useState, useEffect, Suspense, useMemo } from 'react';
import axios from 'axios';
import Transaction from './Shared/Transaction'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "flowbite-react";

const LIMIT_RANGE = 5

export default function Transactions() {
    const navigate = useNavigate();
    const { address } = useParams<{ address: string }>();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [balanceUSD, setBalanceUSD] = useState(0);
    const [transactionOffset, setTransactionOffset] = useState(0);
    const [finished, setFinished] = useState(false);

    // const fetchTransactionDetails = async (platform: string, transactionIds: string[]) => {
    //     try {
    //         const ids = transactionIds.slice(0,10).join(",");
    //         const response = await axios.get(`https://api.blockchair.com/${platform}/dashboards/transaction/${ids}`);
    //         setTransactionDetails(response.data);
    //     } catch (error) {
    //         console.error('Error fetching transaction details:', error);
    //     }
    // }

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const platform = "bitcoin"
            const response = await axios.get(`https://api.blockchair.com/${platform}/dashboards/address/${address}?limit=${LIMIT_RANGE},0&offset=${transactionOffset}&transaction_details=true`);
            console.log(response.data.data)
            const data = response?.data?.data[address]
            if (data['transactions'].length < LIMIT_RANGE) {
                setFinished(true)
            } else {
                setTransactionOffset(transactionOffset+1)
            }
            setTransactions(transactions.concat(data['transactions']))
            setLoading(false);
            if (balance != data?.address?.balance) {
                setBalance(data?.address?.balance)
            }
            if (balanceUSD != data?.address?.balance_usd) {
                setBalanceUSD(data?.address?.balance_usd)
            }
        } catch (error) {
            console.error("Failed to fetch transactions. Please try again.", error);
        }
    }

    useEffect(() => {
        loadTransactions()
    }, []);
  
    function handleBack(e) {
      e.preventDefault();
      navigate(-1)
    }

    const transactionsFrag = () => {
        return (
            <>
                {transactions.map(transaction => <Transaction key={transaction.hash} info={transaction} />)}
                {!finished && <Button className="left-1/2 -translate-x-1/2 $disabled:opacity-50 disabled:cursor-not-allowed" color="blue" disabled={finished} onClick={loadTransactions}>Load More</Button>}
            </>
        )
    }

    return (
        <div>
            <Button className='absolute top-4 left-4' color='blue' onClick={handleBack}>Back</Button>
            {
                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Transactions</h5>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        Balance: {balance}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        Balance USD: {balanceUSD}
                    </div>
                    <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                <Suspense fallback={<div>Loading...</div>}>
                                    { loading ? <div>loading...</div> : transactions.length < 1 ? <div>No Transactions</div> : transactionsFrag()}
                                </Suspense>
                            </ul>
                    </div>
                </div>
            }
        </div>
    )
}
