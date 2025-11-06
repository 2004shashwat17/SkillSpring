import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">Skill<span>Spring</span></div>
          <p className="muted">Where learning grows into careers.</p>
        </div>
        <div>
          <h4>Helpful Links</h4>
          <ul>
            <li>Courses</li>
            <li>Privacy policy</li>
            <li>Refund Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <p>hello@skillspring.com</p>
          <p>support@skillspring.com</p>
          <p>Support Team: 10am-6pm</p>
        </div>
        <div>
          <h4>Connect with us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Youtube</li>
          </ul>
        </div>
      </div>
      <div className="copyright">Copyright © 2025</div>
    </footer>
  )
}
