import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { decryptToken } from "../helpers/tokenUtils";
import { verifyToken } from "../api/authApis";

const TokenVerification = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('token');
    };

    const handleTokenVerification = async (token) => {
      try {
        const decryptedToken = decryptToken(token);
        const { success, accessToken, user, message } = await verifyToken(decryptedToken);

        if (success) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('isAuth', true);
          localStorage.setItem('user', JSON.stringify(user));

          window.location.href = '/dashboard';
        } else {
          toast.error(`Token verification failed: ${message}`);
          window.location.href = '/login';
        }
      } catch (error) {
        toast.error('Token verification failed');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    const token = getTokenFromUrl();
    if (token) {
      handleTokenVerification(token);
    } else {
      toast.error('No token found');
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className="bg-full-screen-image">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <section className="flexbox-container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0 mt-4 mb-4">
                <div className="card border-grey border-lighten-3 px-1 py-1 m-0 ">
                  <div className="card-header border-0">
                    <div className="card-title text-center">
                      <div className="p-1 logo black-logo">
                        <img src="../assets/images/dropboxed-logo.png" alt="branding logo" />
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Authenticating...</span>
                    </h6>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <p className="text-center">Please wait while we redirect you to your dashboard...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TokenVerification;
