import { Briefcase, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <Briefcase size={18} />
              </div>
              <span>Job<span className="footer__logo-accent">Sphere</span></span>
            </Link>
            <p className="footer__tagline">
              Discover your dream career across India with an immersive 3D job search experience.
            </p>
            <div className="footer__india">
              <span className="footer__flag">🇮🇳</span>
              <span>Made for India</span>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Explore</h4>
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/jobs" className="footer__link">Find Jobs</Link>
            <Link to="/bookmarks" className="footer__link">Saved Jobs</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Top Cities</h4>
            <Link to="/jobs?location=Bangalore" className="footer__link">Bangalore</Link>
            <Link to="/jobs?location=Mumbai" className="footer__link">Mumbai</Link>
            <Link to="/jobs?location=Delhi NCR" className="footer__link">Delhi NCR</Link>
            <Link to="/jobs?location=Hyderabad" className="footer__link">Hyderabad</Link>
            <Link to="/jobs?location=Chennai" className="footer__link">Chennai</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Categories</h4>
            <Link to="/jobs?category=it-jobs" className="footer__link">IT & Software</Link>
            <Link to="/jobs?category=engineering-jobs" className="footer__link">Engineering</Link>
            <Link to="/jobs?category=accounting-finance-jobs" className="footer__link">Finance</Link>
            <Link to="/jobs?category=sales-jobs" className="footer__link">Sales & Marketing</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} JobSphere India. Job data powered by{' '}
            <a href="https://www.adzuna.co.in" target="_blank" rel="noopener noreferrer" className="footer__ext-link">
              Adzuna <ExternalLink size={12} />
            </a>
          </p>
          <p className="footer__credit">
            Built with <Heart size={13} className="footer__heart" /> using React + Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
