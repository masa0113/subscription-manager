import React, { useState, useEffect } from 'react';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionForm from './components/SubscriptionForm';
import Settings from './components/Settings';
import { Subscription } from './types';

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addSubscription = (subscription: Subscription) => {
    setSubscriptions([...subscriptions, subscription]);
  };

  const deleteSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">サブスク管理アプリ</h1>
        <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SubscriptionForm addSubscription={addSubscription} />
          <SubscriptionList subscriptions={subscriptions} deleteSubscription={deleteSubscription} />
        </div>
      </div>
    </div>
  );
}

export default App;