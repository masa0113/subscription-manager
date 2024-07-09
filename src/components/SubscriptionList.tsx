import React, { useState } from 'react';
import { Subscription } from '../types';

interface Props {
    subscriptions: Subscription[];
    deleteSubscription: (id: number) => void;
}

function SubscriptionList({ subscriptions, deleteSubscription }: Props) {
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">サブスク一覧</h2>
            <ul className="space-y-4">
                {subscriptions.map(sub => (
                    <li key={sub.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                        <div className="flex items-center">
                            {sub.image && (
                                <img
                                    src={sub.image}
                                    alt={sub.name}
                                    className="w-10 h-10 object-cover rounded-full mr-4"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            )}
                            <span className="font-medium text-gray-700 dark:text-white">{sub.name} - ¥{sub.price}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => setSelectedSubscription(sub)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
                            >
                                詳細
                            </button>
                            <button
                                onClick={() => deleteSubscription(sub.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                            >
                                削除
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* ... モーダルの部分は変更なし ... */}
        </div>
    );
}

export default SubscriptionList;