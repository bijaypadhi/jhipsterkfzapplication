import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Box } from "@chakra-ui/react";
function Footer() {
  return (
    <>
      <Box as="footer" className="footer container">
        <div className="footer-menu-wrap">
          <div className="footer-logo">
            <Link href="#">
              <img src="/assets/images/kfz-logo.svg" alt="Kids Fun Zone Logo" />
            </Link>
          </div>
          <div className="footer-menu">
            <ul>
              <li>
                <Link href="#">FAQ’s</Link>
              </li>
              <li>
                <Link href="#">Help & Support</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-menu">
            <ul>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
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
                <Link href="#" className="youtube">
                  <FaYoutube />
                </Link>
              </li>
              <li>
                <Link href="#" className="instagram">
                  <RiInstagramFill />
                </Link>
              </li>
              <li>
                <Link href="#" className="facebook">
                  <FaFacebook />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Box>
      <div className="copy-rights">
        <p>© 2024-25 - Bytevoyage Pvt. Ltd. All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;
