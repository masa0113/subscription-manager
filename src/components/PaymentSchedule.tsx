import React from 'react';
import { Subscription, PaymentMethod } from '../types';

interface Props {
    subscriptions: Subscription[];
    paymentMethods: PaymentMethod[];
}

function PaymentSchedule({ subscriptions, paymentMethods }: Props) {
    const sortedSubscriptions = [...subscriptions].sort((a, b) => a.paymentDate - b.paymentDate);

    const getPaymentMethod = (id: number): PaymentMethod | undefined => {
        return paymentMethods.find(method => method.id === id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">支払いスケジュール</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedSubscriptions.map((sub) => (
                    <div key={sub.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{sub.name}</div>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                <span className="font-semibold">支払い日:</span> {sub.billingCycle === 'monthly' ? '毎月' : '毎年'}{sub.paymentDate}{sub.billingCycle === 'monthly' ? '日' : '月'}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                <span className="font-semibold">金額:</span> ¥{sub.price.toFixed(2)} / {sub.billingCycle === 'monthly' ? '月' : '年'}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                <span className="font-semibold">支払い方法:</span> {getPaymentMethod(sub.paymentMethodId)?.name || '不明'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PaymentSchedule;