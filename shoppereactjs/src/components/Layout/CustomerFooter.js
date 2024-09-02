import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // For responsive layout
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Social media icons

const CustomerFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 className="text-uppercase">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-white">About Us</a></li>
              <li><a href="#contact" className="text-white">Contact Us</a></li>
              <li><a href="#careers" className="text-white">Careers</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="text-uppercase">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#faq" className="text-white">FAQ</a></li>
              <li><a href="#returns" className="text-white">Returns</a></li>
              <li><a href="#shipping" className="text-white">Shipping Info</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://facebook.com" className="text-white mx-2" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-white mx-2" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-white mx-2" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-white mx-2" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mb-0">&copy; 2024 Your Company Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CustomerFooter;
