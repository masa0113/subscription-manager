import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionForm from './components/SubscriptionForm';
import MyPage from './components/MyPage';
import TotalCost from './components/TotalCost';
import { Subscription } from './types';

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
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link></li>
            <li><Link to="/mypage" className="text-blue-500 hover:text-blue-700">マイページ</Link></li>
          </ul>
        </nav>
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