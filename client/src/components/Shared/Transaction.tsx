export default function Transaction({info}) {
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm text-left font-medium text-gray-900 truncate dark:text-white">
                        {info.balance_change} Satoshi
                    </p>
                    <p className="text-sm text-left text-gray-500 truncate dark:text-gray-400">
                        {info.hash}
                    </p>
                    <p className="text-sm text-left text-gray-500 truncate dark:text-gray-400">
                        {info.time}
                    </p>
                </div>
            </div>
        </li>
    )
}