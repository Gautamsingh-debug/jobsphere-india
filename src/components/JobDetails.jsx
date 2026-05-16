import { X, MapPin, Clock, IndianRupee, ExternalLink, Building2, Bookmark, BookmarkCheck, Share2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './JobDetails.css';

function formatSalary(amount) {
  if (!amount) return '';
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} LPA`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  if (days < 7) return `Posted ${days} days ago`;
  if (days < 30) return `Posted ${Math.floor(days / 7)} weeks ago`;
  return `Posted ${Math.floor(days / 30)} months ago`;
}

export default function JobDetails({ job, isBookmarked, onToggleBookmark, onClose }) {
  if (!job) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: job.title, text: `${job.title} at ${job.company.display_name}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <AnimatePresence>
      <motion.div className="job-details-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className="job-details glass-card"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          id="job-details-modal"
        >
          <div className="job-details__header">
            <div className="job-details__header-left">
              <div className="job-details__logo" style={{ background: 'var(--gradient-primary)' }}>
                {job.company.logo}
              </div>
              <div>
                <h2 className="job-details__title">{job.title}</h2>
                <div className="job-details__company"><Building2 size={14} /> {job.company.display_name}</div>
              </div>
            </div>
            <div className="job-details__header-actions">
              <button className="btn-icon btn-secondary" onClick={handleShare} aria-label="Share"><Share2 size={18} /></button>
              <button className={`btn-icon btn-secondary ${isBookmarked ? 'job-details__bookmarked' : ''}`} onClick={() => onToggleBookmark?.(job)} aria-label="Bookmark">
                {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
              <button className="btn-icon btn-secondary" onClick={onClose} aria-label="Close"><X size={18} /></button>
            </div>
          </div>

          <div className="job-details__info-row">
            <span className="job-details__info-item"><MapPin size={15} /> {job.location.display_name}</span>
            <span className="job-details__info-item"><Clock size={15} /> {timeAgo(job.created)}</span>
            {job.category?.label && <span className="job-details__info-item"><Tag size={15} /> {job.category.label}</span>}
          </div>

          {(job.salary_min > 0 || job.salary_max > 0) && (
            <div className="job-details__salary-bar">
              <IndianRupee size={16} />
              <span className="job-details__salary-range">{formatSalary(job.salary_min)} – {formatSalary(job.salary_max)}</span>
              {job.salary_is_predicted ? <span className="job-details__salary-note">Estimated salary</span> : <span className="job-details__salary-note">Stated salary</span>}
            </div>
          )}

          <div className="job-details__body">
            <h3>About this role</h3>
            <p>{job.description}</p>
            <h3>Key Requirements</h3>
            <ul>
              <li>Strong analytical and problem-solving skills</li>
              <li>Excellent communication and collaboration abilities</li>
              <li>Relevant experience in the domain</li>
              <li>Ability to work in a fast-paced environment</li>
              <li>Passion for innovation and continuous learning</li>
            </ul>
            <h3>Benefits</h3>
            <ul>
              <li>Competitive salary and performance bonuses</li>
              <li>Health insurance for you and family</li>
              <li>Flexible working hours and remote options</li>
              <li>Learning and development budget</li>
              <li>Employee stock options</li>
            </ul>
          </div>

          <div className="job-details__actions">
            <button className="btn btn-primary job-details__apply-btn" onClick={() => {
              if (job.redirect_url && job.redirect_url !== '#') window.open(job.redirect_url, '_blank');
            }}>
              <ExternalLink size={16} /> Apply on Company Site
            </button>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
