import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ArrowRight, Search } from 'lucide-react';
import JobCard from '../components/JobCard';
import JobDetails from '../components/JobDetails';
import { EmptyState } from '../components/LoadingStates';
import { useBookmarks } from '../hooks/useBookmarks';
import './Bookmarks.css';

export default function Bookmarks() {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <main className="bookmarks-page">
      <div className="jobs-page__bg-mesh" />
      <div className="container">
        <div className="bookmarks-header">
          <div className="bookmarks-header__icon">
            <Bookmark size={28} />
          </div>
          <h1 className="bookmarks-header__title">Saved Jobs</h1>
          <p className="bookmarks-header__subtitle">
            {bookmarks.length > 0
              ? `You have ${bookmarks.length} saved job${bookmarks.length > 1 ? 's' : ''}`
              : 'Jobs you bookmark will appear here'
            }
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bookmarks-empty">
            <EmptyState
              title="No saved jobs yet"
              message="Start exploring and bookmark jobs you're interested in. They'll be saved here for easy access."
              icon={<Bookmark size={48} />}
            />
            <Link to="/jobs" className="btn btn-primary bookmarks-empty__cta">
              <Search size={16} /> Find Jobs <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <motion.div
            className="bookmarks-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {bookmarks.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                isBookmarked={isBookmarked(job.id)}
                onToggleBookmark={toggleBookmark}
                onViewDetails={setSelectedJob}
              />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedJob && (
          <JobDetails
            job={selectedJob}
            isBookmarked={isBookmarked(selectedJob.id)}
            onToggleBookmark={toggleBookmark}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
