import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="ct-footer footer-dark">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">
              <img src="/slices/assets/img/logo-light.png" alt="logo" />
            </div>
            <div className="footer-buttons">
              <a href="#"><img src="/slices/assets/img/android.png" alt="Google Play" /></a>
              <a href="#"><img src="/slices/assets/img/ios.png" alt="App Store" /></a>
            </div>
          </div>
        </div>
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 footer-widget">
                <h5 className="widget-title">Information</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/menu">Menu</Link></li>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 footer-widget">
                <h5 className="widget-title">Top Items</h5>
                <ul>
                  <li><Link to="/menu">Pepperoni</Link></li>
                  <li><Link to="/menu">Swiss Mushroom</Link></li>
                  <li><Link to="/menu">Barbeque Chicken</Link></li>
                  <li><Link to="/menu">Vegetarian</Link></li>
                  <li><Link to="/menu">Four Cheese</Link></li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 footer-widget">
                <h5 className="widget-title">Others</h5>
                <ul>
                  <li><Link to="/checkout">Checkout</Link></li>
                  <li><Link to="/cart">Cart</Link></li>
                  <li><Link to="/menu">Menu</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 footer-widget">
                <h5 className="widget-title">Social Media</h5>
                <ul className="social-media">
                  <li><a href="#" className="facebook"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href="#" className="pinterest"><i className="fab fa-pinterest-p" /></a></li>
                  <li><a href="#" className="google"><i className="fab fa-google" /></a></li>
                  <li><a href="#" className="twitter"><i className="fab fa-twitter" /></a></li>
                </ul>
                <div className="footer-offer">
                  <p>Signup and get exclusive offers and coupon codes</p>
                  <Link to="/register" className="btn-custom btn-sm shadow-none">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
            <div className="footer-copyright">
              <p>Copyright © 2024 <a href="https://ultrontechnologies.in/">Ultron Technologies</a> All Rights Reserved.</p>
              <a href="#" className="back-to-top">Back to top <i className="fas fa-chevron-up" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
