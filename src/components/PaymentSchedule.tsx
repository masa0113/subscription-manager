// PaymentSchedule.tsx
import React from 'react';
import { Subscription, PaymentMethod, paymentMethods } from '../types';

interface Props {
    subscriptions: Subscription[];
}

function PaymentSchedule({ subscriptions }: Props) {
    const sortedSubscriptions = [...subscriptions].sort((a, b) => a.paymentDate - b.paymentDate);

    const getPaymentMethod = (id: number): PaymentMethod | undefined => {
        return paymentMethods.find(method => method.id === id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">支払いスケジュール</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">支払い日</th>
                        <th className="border p-2">サブスク名</th>
                        <th className="border p-2">金額</th>
                        <th className="border p-2">支払い方法</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSubscriptions.map((sub) => (
                        <tr key={sub.id}>
                            <td className="border p-2">{sub.paymentDate}日</td>
                            <td className="border p-2">{sub.name}</td>
                            <td className="border p-2">
                                ¥{sub.price.toFixed(2)} / {sub.billingCycle === 'monthly' ? '月' : '年'}
                            </td>
                            <td className="border p-2">{getPaymentMethod(sub.paymentMethodId)?.name || '不明'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentSchedule;