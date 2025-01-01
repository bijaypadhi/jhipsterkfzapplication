import React, { useEffect, useRef, useState } from 'react';
import { MdCancel } from "react-icons/md";
import './Games.scss';
import Loading from 'app/components/loading/Loading';

const GamesIframe = ({ isOpen, onClose, isLoading, requestedSrc }) => {
  const iframeRef = useRef(null);

  // Determine which source to load based on `requestedSrc`
  const getIframeSrc = () => {
    if (requestedSrc === "3000") {
      return "http://localhost:3000/";
    }
    if (requestedSrc === "4000") {
      return "http://localhost:4000/";
    }
    return "http://localhost:3000/"; // Fallback to default
  };

  if (!isOpen) return null;

  return (
    <>
      <div className='modal-container'>
        <div className='modal-content'>
          <div className='modal-close'>
            <MdCancel onClick={onClose} />
          </div>
          {isLoading ? <Loading /> :
            <div className='modal-main'>
              <iframe
                src={getIframeSrc()}
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'scale(1)',
                  WebkitTransform: 'scale(1)',
                  msTransform: 'scale(1)',
                  transformOrigin: '0 0',
                  zoom: 1,
                  border: 'none'
                }}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                allow="microphone; fullscreen"
                allowFullScreen
                title="KFZ Games"
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default GamesIframe;
