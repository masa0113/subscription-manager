import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionForm from './components/SubscriptionForm';
import MyPage from './components/MyPage';
import TotalCost from './components/TotalCost';
import { Subscription } from './types';
import { Navigation } from './components/Navigation';

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const savedSubscriptions = localStorage.getItem('subscriptions');
    return savedSubscriptions ? JSON.parse(savedSubscriptions) : [];
  });

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addSubscription = (subscription: Subscription) => {
    setSubscriptions([...subscriptions, subscription]);
  };

  const deleteSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">サブスク管理アプリ</h1>
              <TotalCost subscriptions={subscriptions} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SubscriptionForm addSubscription={addSubscription} />
                <SubscriptionList subscriptions={subscriptions} deleteSubscription={deleteSubscription} />
              </div>
            </>
          } />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;