import React from 'react'
import MainHeading from './MainHeading'

export default function Contact() {
  return (
    <div>
    <MainHeading />
    <div className="contact-container">
      <h1 className="contact-title">Contact Information</h1>
      <p className="contact-description">
        Reach out to us through the following channels:
      </p>
      <div className="contact-details">
        <div className="contact-detail-item">
          <i className="icon email-icon"></i>
          <p><strong>Email:</strong> contact@yourwebsite.com</p>
        </div>
        <div className="contact-detail-item">
          <i className="icon phone-icon"></i>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
        </div>
        <div className="contact-detail-item">
          <i className="icon address-icon"></i>
          <p><strong>Address:</strong> 123 Book Street, Novel City, 45678</p>
        </div>
        <div className="contact-detail-item">
          <i className="icon hours-icon"></i>
          <p><strong>Working Hours:</strong> Mon-Fri: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  </div>
    
  )
}
