import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleQuickBooksCallback } from '../api/quickbookApis';

const QuickBooksCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    const state = query.get('state');
    const realmId = query.get('realmId');
console.log("code", code,state,realmId)
    if (code && state && realmId) {
      handleQuickBooksCallback({code, state, realmId})
        .then(response => {
          console.log("response>>>>",response)
          if (response.success) {
            const { subdomain } = response;
            window.location.href = `http://${subdomain}.localhost:3000/dashboard`;
          } else {
            console.error('QuickBooks connection failed:', response.message);
          }
        })
        .catch(error => {
          console.error('Error handling QuickBooks callback:', error);
        });
    }
  }, [location, navigate]);

  return <div>Connecting to QuickBooks...</div>;
};

export default QuickBooksCallback;
