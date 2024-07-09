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
                            <img src={sub.image} alt={sub.name} className="w-10 h-10 object-cover rounded-full mr-4" />
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
            {selectedSubscription && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">詳細</h3>
                        <img src={selectedSubscription.image} alt={selectedSubscription.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <p className="mb-2"><span className="font-medium">名前:</span> {selectedSubscription.name}</p>
                        <p className="mb-2"><span className="font-medium">価格:</span> ¥{selectedSubscription.price}</p>
                        <p className="mb-4"><span className="font-medium">説明:</span> {selectedSubscription.description}</p>
                        <button
                            onClick={() => setSelectedSubscription(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SubscriptionList;