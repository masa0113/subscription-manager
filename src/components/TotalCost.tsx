import React from 'react';
import { Subscription } from '../types';

interface Props {
    subscriptions: Subscription[];
}

const TotalCost: React.FC<Props> = ({ subscriptions }) => {
    const monthlyTotal = subscriptions.reduce((total, sub) => {
        return total + (sub.billingCycle === 'monthly' ? sub.price : sub.price / 12);
    }, 0);

    const yearlyTotal = subscriptions.reduce((total, sub) => {
        return total + (sub.billingCycle === 'yearly' ? sub.price : sub.price * 12);
    }, 0);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">合計コスト</h2>
            <p className="text-lg mb-2 dark:text-whit">月額: ¥{monthlyTotal.toLocaleString()}</p>
            <p className="text-lg dark:text-whit">年額: ¥{yearlyTotal.toLocaleString()}</p>
        </div>
    );
};

export default TotalCost;