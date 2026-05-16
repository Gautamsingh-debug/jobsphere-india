import { SlidersHorizontal, X } from 'lucide-react';
import { JOB_CATEGORIES, INDIAN_CITIES } from '../api/mockData';
import './FilterPanel.css';

const CONTRACT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
];

const SALARY_RANGES = [
  { value: 0, label: 'Any Salary' },
  { value: 300000, label: '₹3L+' },
  { value: 600000, label: '₹6L+' },
  { value: 1000000, label: '₹10L+' },
  { value: 1500000, label: '₹15L+' },
  { value: 2500000, label: '₹25L+' },
  { value: 5000000, label: '₹50L+' },
];

const SORT_OPTIONS = [
  { value: 'date', label: 'Most Recent' },
  { value: 'salary', label: 'Highest Salary' },
  { value: 'relevance', label: 'Relevance' },
];

export default function FilterPanel({ filters, onFilterChange, isOpen, onClose }) {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  return (
    <>
      {isOpen && <div className="filter-overlay" onClick={onClose} />}
      <aside className={`filter-panel ${isOpen ? 'filter-panel--open' : ''}`} id="filter-panel">
        <div className="filter-panel__header">
          <h3><SlidersHorizontal size={18} /> Filters</h3>
          <button className="btn-icon" onClick={onClose} aria-label="Close filters"><X size={18} /></button>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <div className="filter-chips">
            {SORT_OPTIONS.map(opt => (
              <button key={opt.value} className={`filter-chip ${filters.sortBy === opt.value ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('sortBy', opt.value)}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Job Type</label>
          <div className="filter-chips">
            {CONTRACT_TYPES.map(opt => (
              <button key={opt.value} className={`filter-chip ${filters.contractType === opt.value ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('contractType', opt.value)}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Minimum Salary</label>
          <div className="filter-chips">
            {SALARY_RANGES.map(opt => (
              <button key={opt.value} className={`filter-chip ${filters.salaryMin === opt.value ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('salaryMin', opt.value)}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="filter-chips filter-chips--scrollable">
            <button className={`filter-chip ${!filters.category ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('category', '')}>All</button>
            {JOB_CATEGORIES.map(cat => (
              <button key={cat.tag} className={`filter-chip ${filters.category === cat.tag ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('category', cat.tag)}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Location</label>
          <div className="filter-chips filter-chips--scrollable">
            <button className={`filter-chip ${!filters.location ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('location', '')}>All India</button>
            {INDIAN_CITIES.map(city => (
              <button key={city.name} className={`filter-chip ${filters.location === city.name ? 'filter-chip--active' : ''}`} onClick={() => updateFilter('location', city.name)}>{city.name}</button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
