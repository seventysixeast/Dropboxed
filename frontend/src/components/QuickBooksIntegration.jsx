import React from 'react';

const QuickBooksIntegration = () => {
  const handleQuickBooksAuth = () => {
    window.location.href = 'http://localhost:6977/quickbooks/requestToken';
  };

  return (
    <button onClick={handleQuickBooksAuth}>
      Connect to QuickBooks
    </button>
  );
};

export default QuickBooksIntegration;
