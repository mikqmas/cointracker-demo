import pict1 from "../../assets/react.svg"

export default function Card({info}) {
    console.log("HERE", info)
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={pict1} alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Neil Sims
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    $320
                </div>
            </div>
        </li>
    )
}