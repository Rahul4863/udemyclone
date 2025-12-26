import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="udemy-footer">
            <div className="footer-top">
                <h4 className="footer-heading">Explore top skills and certifications</h4>

                <div className="footer-grid">
                    <div className="footer-col">
                        <h5>Web Development</h5>
                        <a>Web Development</a>
                        <a>JavaScript</a>
                        <a>React JS</a>
                        <a>Angular</a>
                        <a>Java</a>
                    </div>

                    <div className="footer-col">
                        <h5>IT Certifications</h5>
                        <a>Amazon AWS</a>
                        <a>AWS Cloud Practitioner</a>
                        <a>AZ-900 Azure</a>
                        <a>AWS Solutions Architect</a>
                        <a>Kubernetes</a>
                    </div>

                    <div className="footer-col">
                        <h5>Leadership</h5>
                        <a>Leadership</a>
                        <a>Management Skills</a>
                        <a>Project Management</a>
                        <a>Productivity</a>
                        <a>Emotional Intelligence</a>
                    </div>

                    <div className="footer-col">
                        <h5>Certifications by Skill</h5>
                        <a>Cybersecurity</a>
                        <a>Project Management</a>
                        <a>Cloud Certification</a>
                        <a>Data Analytics</a>
                        <a>HR Management</a>
                    </div>

                    <div className="footer-col">
                        <h5>Data Science</h5>
                        <a>Python</a>
                        <a>Machine Learning</a>
                        <a>Deep Learning</a>
                        <a>AI / ChatGPT</a>
                    </div>

                    <div className="footer-col">
                        <h5>Communication</h5>
                        <a>Public Speaking</a>
                        <a>Presentation Skills</a>
                        <a>Communication Skills</a>
                        <a>Writing</a>
                    </div>

                    <div className="footer-col">
                        <h5>Business Analytics</h5>
                        <a>Excel</a>
                        <a>Power BI</a>
                        <a>Data Analysis</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-links">
                        <a>About us</a>
                        <a>Careers</a>
                        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact us</Link>
                        <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>Blog</Link>
                    </div>
                </div>
            </div>
            <div className="footer-end">
                © 2025 LMS Platform | All Rights Reserved
            </div>
        </footer>
    );
}
export default Footer;
