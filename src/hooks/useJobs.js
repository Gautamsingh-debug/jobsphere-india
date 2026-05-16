import { useState, useEffect, useCallback, useRef } from 'react';
import { isApiConfigured, searchJobs } from '../api/adzuna';
import { searchMockJobs } from '../api/mockData';

export function useJobs(initialParams = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usingApi, setUsingApi] = useState(false);
  const debounceRef = useRef(null);

  const fetchJobs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isApiConfigured()) {
        setUsingApi(true);
        result = await searchJobs(params);
      } else {
        setUsingApi(false);
        result = searchMockJobs(params);
      }
      setJobs(result.results);
      setTotalCount(result.count);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
      // Fallback to mock on API error
      const result = searchMockJobs(params);
      setJobs(result.results);
      setTotalCount(result.count);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);
      setUsingApi(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback((params) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchJobs(params), 350);
  }, [fetchJobs]);

  useEffect(() => {
    fetchJobs(initialParams);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { jobs, loading, error, totalCount, currentPage, totalPages, usingApi, fetchJobs, debouncedSearch };
}
