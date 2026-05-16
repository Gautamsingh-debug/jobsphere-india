import { useState, useRef, Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, MapPin, Sparkles, Users, Building2, ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { useJobs } from '../hooks/useJobs';
import { useBookmarks } from '../hooks/useBookmarks';
import { JOB_CATEGORIES, INDIAN_CITIES } from '../api/mockData';
import './Home.css';

const HeroScene = lazy(() => import('../components/3d/HeroScene'));
const GlobeScene = lazy(() => import('../components/3d/GlobeScene'));

const STATS = [
  { value: '45,000+', label: 'Active Jobs', icon: <TrendingUp size={20} /> },
  { value: '12', label: 'Major Cities', icon: <MapPin size={20} /> },
  { value: '2,500+', label: 'Companies', icon: <Building2 size={20} /> },
  { value: '50K+', label: 'Job Seekers', icon: <Users size={20} /> },
];

function AnimatedCounter({ value, label, icon, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      className="stat-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-card__icon">{icon}</div>
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </motion.div>
  );
}

function CategoryCard({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link to={`/jobs?category=${cat.tag}`} className="category-card glass-card" id={`cat-${cat.tag}`}>
        <span className="category-card__icon">{cat.icon}</span>
        <span className="category-card__label">{cat.label}</span>
        <span className="category-card__count">{cat.count.toLocaleString()} jobs</span>
        <ChevronRight size={16} className="category-card__arrow" />
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { jobs } = useJobs({ perPage: 6 });
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSearch = ({ query, location }) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const handleCityClick = (city) => {
    navigate(`/jobs?location=${encodeURIComponent(city.name)}`);
  };

  return (
    <main className="home-page">
      {/* ========== HERO ========== */}
      <section className="hero-section" id="hero">
        <Suspense fallback={<div className="hero-scene-fallback" />}>
          <HeroScene />
        </Suspense>
        <div className="hero-content container">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={14} />
            <span>3D Job Search Experience</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Find Your Dream Career{' '}
            <span className="hero-title__gradient">Across India</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            Search thousands of opportunities from top companies in Bangalore, Mumbai, Delhi NCR, Hyderabad and more.
          </motion.p>

          <motion.div
            className="hero-search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          <motion.div
            className="hero-trending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="hero-trending__label">Trending:</span>
            {['React Developer', 'Data Scientist', 'Product Manager', 'DevOps'].map(tag => (
              <button key={tag} className="hero-trending__tag" onClick={() => handleSearch({ query: tag, location: '' })}>
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
        <div className="hero-gradient-bottom" />
      </section>

      {/* ========== STATS ========== */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat, i) => (
              <AnimatedCounter key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section className="categories-section section" id="categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Explore opportunities across India's fastest-growing industries</p>
          </div>
          <div className="categories-grid">
            {JOB_CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.tag} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED JOBS ========== */}
      <section className="featured-section section" id="featured-jobs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Opportunities</h2>
            <p className="section-subtitle">Hand-picked roles from top companies across India</p>
          </div>
          <div className="featured-grid">
            {jobs.slice(0, 6).map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                isBookmarked={isBookmarked(job.id)}
                onToggleBookmark={toggleBookmark}
                onViewDetails={() => navigate(`/jobs?q=${encodeURIComponent(job.title)}`)}
              />
            ))}
          </div>
          <div className="featured-cta">
            <Link to="/jobs" className="btn btn-primary featured-cta__btn" id="view-all-jobs">
              View All Jobs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== GLOBE ========== */}
      <section className="globe-section section" id="globe">
        <div className="container">
          <div className="globe-layout">
            <div className="globe-text">
              <h2 className="section-title">Explore by City</h2>
              <p className="section-subtitle">
                Discover opportunities in India's top tech hubs and business centers. Click a city on the globe to start searching.
              </p>
              <div className="globe-cities">
                {INDIAN_CITIES.slice(0, 6).map(city => (
                  <button
                    key={city.name}
                    className="globe-city-chip"
                    onClick={() => handleCityClick(city)}
                  >
                    <MapPin size={14} />
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="globe-canvas">
              <Suspense fallback={<div className="globe-fallback"><div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /></div>}>
                <GlobeScene onCityClick={handleCityClick} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="cta-section section" id="cta">
        <div className="container">
          <motion.div
            className="cta-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-card__orb cta-card__orb--1" />
            <div className="cta-card__orb cta-card__orb--2" />
            <h2 className="cta-card__title">Ready to Start Your Journey?</h2>
            <p className="cta-card__text">
              Join thousands of professionals finding their next opportunity through JobSphere India.
            </p>
            <Link to="/jobs" className="btn btn-primary cta-card__btn" id="cta-explore">
              Explore Jobs Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
