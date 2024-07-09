import React, { useState, useEffect } from 'react';
import { Subscription, SubscriptionSuggestion, subscriptionSuggestions } from '../types';

interface Props {
    addSubscription: (subscription: Subscription) => void;
}

function SubscriptionForm({ addSubscription }: Props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [suggestions, setSuggestions] = useState<SubscriptionSuggestion[]>([]);

    useEffect(() => {
        if (name.length > 1) {
            const filteredSuggestions = subscriptionSuggestions.filter(
                suggestion => suggestion.name.toLowerCase().includes(name.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSubscription: Subscription = {
            id: Date.now(),
            name,
            price: Number(price),
            description,
            image
        };
        addSubscription(newSubscription);
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
    };

    const handleSuggestionClick = (suggestion: SubscriptionSuggestion) => {
        setName(suggestion.name);
        setImage(suggestion.image);
        setSuggestions([]);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">新規サブスク追加</h2>
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="サブスク名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />
                {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.name}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            >
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    placeholder="価格"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="説明"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 h-32 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="画像URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 transition duration-300"
            >
                追加
            </button>
        </form>
    );
}

export default SubscriptionForm;