import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SubscriptionList from './components/SubscriptionList';
import SubscriptionForm from './components/SubscriptionForm';
import MyPage from './components/MyPage';
import TotalCost from './components/TotalCost';
import { PaymentMethod, Subscription } from './types';
import { Navigation } from './components/Navigation';
import PaymentMethodsPage from './components/PaymentMethodsPage';
import PaymentSchedule from './components/PaymentSchedule';

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const savedSubscriptions = localStorage.getItem('subscriptions');
    return savedSubscriptions ? JSON.parse(savedSubscriptions) : [];
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const methods = localStorage.getItem('paymentMethods');
    return methods ? JSON.parse(methods) : [];
  });

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
  }, [subscriptions, paymentMethods]);

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
              <h1 className="text-3xl font-bold mb-8 text-center">サブスク管理アプリ</h1>
              <TotalCost subscriptions={subscriptions} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SubscriptionForm
                  addSubscription={addSubscription}
                  availablePaymentMethods={paymentMethods}
                />
                <SubscriptionList subscriptions={subscriptions} deleteSubscription={deleteSubscription} />
              </div>
              <PaymentSchedule subscriptions={subscriptions} paymentMethods={paymentMethods} />
            </>
          } />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/payment-methods" element={
            <PaymentMethodsPage
              availableMethods={paymentMethods}
              setAvailableMethods={setPaymentMethods}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;