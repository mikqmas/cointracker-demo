import pict1 from "../../assets/bitcoin-btc-logo.svg"

export default function Card({info, handleClick}) {
    return (
        <li className="py-3 sm:py-4">
            <button onClick={handleClick(info.address)}>
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={pict1} alt="Neil image" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm text-left font-medium text-gray-900 truncate dark:text-white">
                            Wallet ID: {info.wallet_id}
                        </p>
                        <p className="text-sm text-left text-gray-500 truncate dark:text-gray-400">
                            {info.address}
                        </p>
                    </div>
                </div>
            </button>
        </li>
    )
}