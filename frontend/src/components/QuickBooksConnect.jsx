import React from 'react';
import { getQuickBooksAuthUrl } from '../api/quickbookApis';

const QuickBooksConnect = () => {
  const handleQuickBooksConnect = () => {
    getQuickBooksAuthUrl()
      .then(authUrl => {
        console.log("response>>>", authUrl);
        window.location.href = authUrl;
      })
      .catch(error => {
        console.error('Error getting QuickBooks auth URL:', error);
      });
  };

  return (
    <button className="btn btn-outline-primary mr-1" onClick={handleQuickBooksConnect}>Connect to QuickBooks</button>
  );
};

export default QuickBooksConnect;
