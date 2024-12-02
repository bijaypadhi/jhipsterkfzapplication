import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { Box } from '@chakra-ui/react';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <>
      <Box as="footer" className="footer container">
        <div className="footer-menu-wrap">
          <div className="footer-logo">
            <Link to="#">
              <img src="content/images/kfz-logo.svg" alt="Kids Fun Zone Logo" />
            </Link>
          </div>
          <div className="footer-menu">
            <ul>
              <li>
                <Link to="#">FAQ’s</Link>
              </li>
              <li>
                <Link to="#">Help & Support</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <ul>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms & Conditions</Link>
              </li>
              {/* <li>
                <a href="#">Shipping, Cancellation & Refund Policy</a>
              </li> */}
            </ul>
          </div>
          <div className="follow-us">
            <p>Follow us</p>
            <ul>
              <li>
                <a href="#" className="youtube">
                  <FaYoutube />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/KidsFunZone" className="instagram" target='_blank' rel="noopener noreferrer">
                  <RiInstagramFill />
                </a>
              </li>
              <li>
                <a href="https://facebook.com/KidsFunZone" className="facebook" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/KidsFunZone" className="twitter" target="_blank" rel="noopener noreferrer">
                  <FaSquareXTwitter />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Box>
      <div className="copy-rights">
        <p>© 2024-25 - Bytevoyager Pvt. Ltd. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
