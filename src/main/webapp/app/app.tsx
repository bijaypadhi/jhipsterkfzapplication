import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';
import './index.scss';
import './assets/styles/common.scss';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import ErrorBoundary from 'app/shared/error/error-boundary';
import OkumaReaderModal from 'app/modules/book/OkumaReaderModal';
import CanvasModal from 'app/modules/canvas/CanvasModal';
import IntegrationPage from 'app/modules/sample/integrationPage';
import usePortal from 'react-useportal';
// import { createPortal } from 'react-useportal';
const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') || '';

export const App = () => {
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState<string | null>(null); // State to track which modal is open

  useEffect(() => {
    console.log('Modal Open State:', modalType);
  }, [modalType]);

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

  const paddingTop = '0';
  const { Portal } = usePortal();

  const openModal = (type: string) => {
    setModalType(type); // Set the modal type
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
  };

  return (
    <Router basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />

        <div id="app-view-container">
          <ErrorBoundary>
            <Routes>
              {/* Your existing routes */}
              <Route path="/home" element={<AppRoutes />} />
              <Route path="/bookstore" element={<AppRoutes />} />
              <Route path="/about" element={<AppRoutes />} />
              <Route path="/contact" element={<AppRoutes />} />
              <Route path="/help" element={<AppRoutes />} />
              <Route path="/sample/integrationPage" element={<IntegrationPage />} />
              <Route path="*" element={<AppRoutes />} />
            </Routes>
            {/* <div>
              <h3>Temporary Test Button</h3>
              <button onClick={() => openModal('okumaReader')}>Open bookWriter</button>
            </div> */}

            {/* Render Okuma-Reader modal inside a portal */}
            {/* <Portal>
              {modalType === 'okumaReader' && (
                <OkumaReaderModal isOpen={modalType === 'okumaReader'} onClose={closeModal} />
              )}
            </Portal> */}

            {/* <div>
              <h3>Temporary Test Button</h3>
              <button onClick={() => openModal('paintBrush')}>Paint Brush</button>
            </div> */}

            {/* Render Paint Brush modal inside a portal */}
            {/* <Portal>
              {modalType === 'paintBrush' && (
                <CanvasModal isOpen={modalType === 'paintBrush'} onClose={closeModal} />
              )}
            </Portal> */}
          </ErrorBoundary>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
