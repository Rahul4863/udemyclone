import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

export default function Contact() {
    return (
        <div className="contact-wrapper">
            <div className="container py-5">

                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtext">
                        We would love to hear from you. Please fill out the form and we’ll get back to you shortly.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="contact-card shadow-sm">
                            <i className="bi bi-telephone-fill contact-icon"></i>
                            <h5>Phone</h5>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="contact-card shadow-sm">
                            <i className="bi bi-envelope-fill contact-icon"></i>
                            <h5>Email</h5>
                            <p>support@example.com</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="contact-card shadow-sm">
                            <i className="bi bi-geo-alt-fill contact-icon"></i>
                            <h5>Location</h5>
                            <p>Mumbai, India</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="contact-form shadow-lg p-4 rounded">
                            <h4 className="mb-3">Send us a message</h4>

                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" placeholder="Your Name" />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" placeholder="you@example.com" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Subject</label>
                                    <input type="text" className="form-control" placeholder="How can we help you?" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea rows="4" className="form-control" placeholder="Write your message here..."></textarea>
                                </div>

                                <button className="btn contact-btn w-100">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
