import React from 'react';
import { Subscription } from '../types';

interface Props {
    subscriptions: Subscription[];
}

const TotalCost: React.FC<Props> = ({ subscriptions }) => {
    const monthlyTotal = subscriptions.reduce((total, sub) => total + sub.price, 0);
    const yearlyTotal = monthlyTotal * 12;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">合計コスト</h2>
            <p className="text-lg mb-2">月額: ¥{monthlyTotal.toLocaleString()}</p>
            <p className="text-lg">年額: ¥{yearlyTotal.toLocaleString()}</p>
        </div>
    );
};

export default TotalCost;