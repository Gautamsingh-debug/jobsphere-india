import { MapPin, Clock, Bookmark, BookmarkCheck, IndianRupee, ExternalLink, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './JobCard.css';

function formatSalary(amount) {
  if (!amount) return '';
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return amount.toString();
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function contractLabel(type) {
  const map = { full_time: 'Full-time', part_time: 'Part-time', contract: 'Contract' };
  return map[type] || 'Full-time';
}

function contractTagClass(type) {
  const map = { full_time: 'tag-emerald', part_time: 'tag-amber', contract: 'tag-violet' };
  return map[type] || 'tag-emerald';
}

const gradientColors = [
  'linear-gradient(135deg, #3b82f6, #6366f1)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #06b6d4, #3b82f6)',
  'linear-gradient(135deg, #10b981, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #ec4899, #8b5cf6)',
];

export default function JobCard({ job, index = 0, isBookmarked, onToggleBookmark, onViewDetails }) {
  const logoGradient = gradientColors[job.title.length % gradientColors.length];

  return (
    <motion.article
      className="job-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onViewDetails?.(job)}
      id={`job-card-${job.id}`}
    >
      <div className="job-card__header">
        <div className="job-card__logo" style={{ background: logoGradient }}>
          {job.company.logo}
        </div>
        <div className="job-card__meta">
          <span className="job-card__company"><Building2 size={13} /> {job.company.display_name}</span>
          <span className="job-card__time"><Clock size={12} /> {timeAgo(job.created)}</span>
        </div>
        <button
          className={`job-card__bookmark ${isBookmarked ? 'job-card__bookmark--active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleBookmark?.(job); }}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      <h3 className="job-card__title">{job.title}</h3>

      <div className="job-card__location">
        <MapPin size={14} />
        <span>{job.location.display_name}</span>
      </div>

      <p className="job-card__desc">{job.description}</p>

      <div className="job-card__footer">
        <div className="job-card__tags">
          <span className={`tag ${contractTagClass(job.contract_type)}`}>{contractLabel(job.contract_type)}</span>
          {job.category?.label && <span className="tag tag-blue">{job.category.label}</span>}
        </div>
        {(job.salary_min > 0 || job.salary_max > 0) && (
          <div className="job-card__salary">
            <IndianRupee size={13} />
            <span>{formatSalary(job.salary_min)} – {formatSalary(job.salary_max)}</span>
            {job.salary_is_predicted ? <span className="job-card__salary-est">est.</span> : null}
          </div>
        )}
      </div>

      <div className="job-card__actions">
        <button className="btn btn-primary job-card__apply" onClick={(e) => {
          e.stopPropagation();
          if (job.redirect_url && job.redirect_url !== '#') window.open(job.redirect_url, '_blank');
          else onViewDetails?.(job);
        }}>
          <ExternalLink size={14} /> Apply Now
        </button>
      </div>
    </motion.article>
  );
}
