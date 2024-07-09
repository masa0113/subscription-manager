import React, { useState, useEffect } from 'react';
import { PaymentMethod } from '../types';

interface Props {
    availableMethods: PaymentMethod[];
    setAvailableMethods: (methods: PaymentMethod[]) => void;
}

function PaymentMethodsPage({ availableMethods, setAvailableMethods }: Props) {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [newMethodName, setNewMethodName] = useState('');
    const [newMethodType, setNewMethodType] = useState<'credit' | 'debit' | 'other'>('credit');

    useEffect(() => {
        // 初期データを設定
        setMethods(availableMethods.map(method => ({ ...method, isSelected: true })));
    }, [availableMethods]);

    const addMethod = () => {
        const newMethod: PaymentMethod = {
            id: Date.now(),
            name: newMethodName,
            type: newMethodType,
            isSelected: true
        };
        setMethods([...methods, newMethod]);
        setNewMethodName('');
        updateAvailableMethods([...methods, newMethod]);
    };

    const toggleMethodSelection = (id: number) => {
        const updatedMethods = methods.map(method =>
            method.id === id ? { ...method, isSelected: !method.isSelected } : method
        );
        setMethods(updatedMethods);
        updateAvailableMethods(updatedMethods);
    };

    const deleteMethod = (id: number) => {
        const updatedMethods = methods.filter(method => method.id !== id);
        setMethods(updatedMethods);
        updateAvailableMethods(updatedMethods);
    };

    const updateAvailableMethods = (updatedMethods: PaymentMethod[]) => {
        setAvailableMethods(updatedMethods.filter(method => method.isSelected));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">支払い方法管理</h1>
            <ul className="mb-4">
                {methods.map((method) => (
                    <li key={method.id} className="mb-2 flex items-center">
                        <input
                            type="checkbox"
                            checked={method.isSelected}
                            onChange={() => toggleMethodSelection(method.id)}
                            className="mr-2"
                        />
                        <span className="mr-2">{method.name} ({method.type})</span>
                        <button
                            onClick={() => deleteMethod(method.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                            削除
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mb-4">
                <input
                    type="text"
                    value={newMethodName}
                    onChange={(e) => setNewMethodName(e.target.value)}
                    placeholder="新しい支払い方法名"
                    className="mr-2 px-2 py-1 border rounded"
                />
                <select
                    value={newMethodType}
                    onChange={(e) => setNewMethodType(e.target.value as 'credit' | 'debit' | 'other')}
                    className="mr-2 px-2 py-1 border rounded"
                >
                    <option value="credit">クレジットカード</option>
                    <option value="debit">デビットカード</option>
                    <option value="other">その他</option>
                </select>
                <button onClick={addMethod} className="px-4 py-2 bg-blue-500 text-white rounded">
                    追加
                </button>
            </div>
        </div>
    );
}

export default PaymentMethodsPage;