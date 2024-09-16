import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';
import "./index.scss";
import "./assets/styles/common.scss";
import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import BookStore from './components/BookStore';
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') || '';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, [dispatch]);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.isInProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const paddingTop = '60px';

  return (
    <Router basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer
          position={toast.POSITION.TOP_LEFT}
          className="toastify-container"
          toastClassName="toastify-toast"
        />

        <div className="container-fluid view-container" id="app-view-container">

            <ErrorBoundary>
              <Routes>
                {/* Your existing routes */}
                 <Route path="/home" element={<AppRoutes />} />
                <Route path="/bookstore" element={<AppRoutes />} />
                <Route path="/about" element={<AppRoutes />} />
                <Route path="/contact" element={<AppRoutes />} />
                <Route path="/help" element={<AppRoutes />} />

                {/* Okuma-Reader route */}
                <Route
                  path="/okuma-reader"
                  element={
                    <iframe
                      src="http://localhost:8000/Okuma-Reader"
                      style={{ width: '100%', height: '80vh', border: 'none' }}
                      allow="microphone"
                      allowFullScreen={true}
                      title="Okuma-Reader"
                    />
                  }
                />

                {/* Default route */}
                <Route path="*" element={<AppRoutes />} />
              </Routes>
            </ErrorBoundary>

        </div>
      </div>
    </Router>
  );
};

export default App;
