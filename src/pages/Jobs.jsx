import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import JobDetails from '../components/JobDetails';
import FilterPanel from '../components/FilterPanel';
import { SkeletonGrid, EmptyState } from '../components/LoadingStates';
import { useJobs } from '../hooks/useJobs';
import { useBookmarks } from '../hooks/useBookmarks';
import './Jobs.css';

const DEFAULT_FILTERS = {
  query: '',
  location: '',
  category: '',
  contractType: '',
  salaryMin: 0,
  sortBy: 'date',
  page: 1,
  perPage: 12,
};

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    query: searchParams.get('q') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
  }));
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const { jobs, loading, error, totalCount, currentPage, totalPages, usingApi, fetchJobs } = useJobs(filters);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Sync filters → API
  useEffect(() => {
    fetchJobs(filters);
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync URL params on mount
  useEffect(() => {
    const q = searchParams.get('q');
    const location = searchParams.get('location');
    const category = searchParams.get('category');
    if (q || location || category) {
      setFilters(prev => ({
        ...prev,
        query: q || prev.query,
        location: location || prev.location,
        category: category || prev.category,
        page: 1,
      }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = useCallback(({ query, location }) => {
    setFilters(prev => ({ ...prev, query, location, page: 1 }));
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    setSearchParams(params);
  }, [setSearchParams]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeFilterCount = [
    filters.category,
    filters.contractType,
    filters.salaryMin > 0,
    filters.sortBy !== 'date',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setSearchParams({});
  };

  return (
    <main className="jobs-page">
      <div className="jobs-page__bg-mesh" />

      {/* Search Header */}
      <section className="jobs-header" id="jobs-header">
        <div className="container">
          <div className="jobs-header__inner">
            <SearchBar
              onSearch={handleSearch}
              compact
            />
          </div>
        </div>
      </section>

      {/* Results Area */}
      <section className="jobs-content container">
        {/* Toolbar */}
        <div className="jobs-toolbar">
          <div className="jobs-toolbar__left">
            <h1 className="jobs-toolbar__title">
              {filters.query ? (
                <>Results for "<span className="jobs-toolbar__query">{filters.query}</span>"</>
              ) : (
                'All Jobs'
              )}
            </h1>
            <span className="jobs-toolbar__count">{totalCount.toLocaleString()} jobs found</span>
            {!usingApi && (
              <span className="jobs-toolbar__badge">Demo Data</span>
            )}
          </div>
          <div className="jobs-toolbar__right">
            {activeFilterCount > 0 && (
              <button className="btn btn-ghost jobs-toolbar__clear" onClick={clearFilters}>
                <X size={14} /> Clear filters
              </button>
            )}
            <button
              className="btn btn-secondary jobs-toolbar__filter-btn"
              onClick={() => setFilterOpen(true)}
              id="open-filters-btn"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="jobs-toolbar__filter-count">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(filters.category || filters.contractType || filters.location) && (
          <div className="jobs-active-filters">
            {filters.location && (
              <span className="active-filter-tag">
                📍 {filters.location}
                <button onClick={() => setFilters(prev => ({ ...prev, location: '', page: 1 }))}><X size={12} /></button>
              </span>
            )}
            {filters.category && (
              <span className="active-filter-tag">
                🏷️ {filters.category.replace(/-/g, ' ')}
                <button onClick={() => setFilters(prev => ({ ...prev, category: '', page: 1 }))}><X size={12} /></button>
              </span>
            )}
            {filters.contractType && (
              <span className="active-filter-tag">
                📋 {filters.contractType.replace('_', '-')}
                <button onClick={() => setFilters(prev => ({ ...prev, contractType: '', page: 1 }))}><X size={12} /></button>
              </span>
            )}
          </div>
        )}

        {/* Job Grid */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : error ? (
          <EmptyState
            title="Something went wrong"
            message={error}
          />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No jobs found"
            message="Try adjusting your filters or search for something different."
          />
        ) : (
          <motion.div
            className="jobs-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {jobs.map((job, i) => (
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

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="jobs-pagination" id="pagination">
            <button
              className="btn btn-secondary jobs-pagination__btn"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <div className="jobs-pagination__pages">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let page;
                if (totalPages <= 7) {
                  page = i + 1;
                } else if (currentPage <= 4) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  page = totalPages - 6 + i;
                } else {
                  page = currentPage - 3 + i;
                }
                return (
                  <button
                    key={page}
                    className={`jobs-pagination__page ${currentPage === page ? 'jobs-pagination__page--active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              className="btn btn-secondary jobs-pagination__btn"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
      />

      {/* Job Details Modal */}
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
