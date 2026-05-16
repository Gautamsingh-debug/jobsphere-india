import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { INDIAN_CITIES } from '../api/mockData';
import './SearchBar.css';

export default function SearchBar({ onSearch, compact = false }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showLocations, setShowLocations] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ query, location });
  };

  const selectCity = (city) => {
    setLocation(city.name);
    setShowLocations(false);
    onSearch?.({ query, location: city.name });
  };

  return (
    <form className={`search-bar ${compact ? 'search-bar--compact' : ''}`} onSubmit={handleSubmit} id="job-search-form">
      <div className="search-bar__field search-bar__field--query">
        <Search size={18} className="search-bar__icon" />
        <input
          type="text"
          placeholder="Job title, company, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar__input"
          id="search-query-input"
        />
      </div>
      <div className="search-bar__divider" />
      <div className="search-bar__field search-bar__field--location">
        <MapPin size={18} className="search-bar__icon" />
        <input
          type="text"
          placeholder="City or state..."
          value={location}
          onChange={(e) => { setLocation(e.target.value); setShowLocations(true); }}
          onFocus={() => setShowLocations(true)}
          onBlur={() => setTimeout(() => setShowLocations(false), 200)}
          className="search-bar__input"
          id="search-location-input"
        />
        <ChevronDown size={16} className="search-bar__chevron" />
        {showLocations && (
          <div className="search-bar__dropdown" id="location-dropdown">
            {INDIAN_CITIES.filter(c => !location || c.name.toLowerCase().includes(location.toLowerCase())).map(city => (
              <button key={city.name} type="button" className="search-bar__dropdown-item" onClick={() => selectCity(city)}>
                <MapPin size={14} />
                <span>{city.name}</span>
                <span className="search-bar__dropdown-state">{city.state}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary search-bar__submit" id="search-submit-btn">
        <Search size={18} />
        <span>Search</span>
      </button>
    </form>
  );
}
