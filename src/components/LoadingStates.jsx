import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import './LoadingStates.css';

export function SkeletonJobCard() {
  return (
    <div className="skeleton-card glass-card">
      <div className="skeleton-card__header">
        <div className="skeleton skeleton-card__logo" />
        <div className="skeleton-card__meta">
          <div className="skeleton skeleton-card__line skeleton-card__line--sm" />
          <div className="skeleton skeleton-card__line skeleton-card__line--xs" />
        </div>
      </div>
      <div className="skeleton skeleton-card__line skeleton-card__line--lg" />
      <div className="skeleton skeleton-card__line skeleton-card__line--md" />
      <div className="skeleton skeleton-card__line skeleton-card__line--full" />
      <div className="skeleton-card__footer">
        <div className="skeleton skeleton-card__chip" />
        <div className="skeleton skeleton-card__chip" />
      </div>
      <div className="skeleton skeleton-card__btn" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonJobCard key={i} />
      ))}
    </div>
  );
}

export function SpinnerLoader({ text = 'Loading jobs...' }) {
  return (
    <div className="spinner-loader" id="spinner-loader">
      <motion.div
        className="spinner-loader__icon"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Briefcase size={32} />
      </motion.div>
      <p className="spinner-loader__text">{text}</p>
    </div>
  );
}

export function EmptyState({ title = 'No jobs found', message = 'Try adjusting your filters or search terms.', icon }) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="empty-state"
    >
      <div className="empty-state__icon">
        {icon || <Briefcase size={48} />}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
    </motion.div>
  );
}
