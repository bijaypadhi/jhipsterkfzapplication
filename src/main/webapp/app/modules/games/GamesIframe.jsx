import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import './Games.scss'; 
import Loading from 'app/components/loading/Loading';
import { MdCancel } from "react-icons/md";


const GamesIframe = ({ isOpen, onClose, isLoading }) => {
  const iframeRef = useRef(null);
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
                src="http://localhost:8000/bookwriter/"
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
      </div></>
  );
};

export default GamesIframe;
