import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, Menu, X, Briefcase } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" id="logo-link">
          <div className="navbar__logo-icon">
            <Briefcase size={20} />
          </div>
          <span className="navbar__logo-text">
            Job<span className="navbar__logo-accent">Sphere</span>
          </span>
        </Link>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`} id="nav-home">Home</Link>
          <Link to="/jobs" className={`navbar__link ${location.pathname === '/jobs' ? 'navbar__link--active' : ''}`} id="nav-jobs">Find Jobs</Link>
          <Link to="/bookmarks" className={`navbar__link ${location.pathname === '/bookmarks' ? 'navbar__link--active' : ''}`} id="nav-bookmarks">
            <Bookmark size={16} /> Saved
          </Link>
        </div>

        <div className="navbar__actions">
          <Link to="/jobs" className="btn btn-primary navbar__cta" id="nav-cta">
            <Search size={16} /> Search Jobs
          </Link>
          <button className="btn-icon navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" id="mobile-toggle">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
