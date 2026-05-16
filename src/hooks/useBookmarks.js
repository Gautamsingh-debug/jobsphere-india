import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jobsphere_bookmarks';

function getStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(getStored);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback((job) => {
    setBookmarks(prev => {
      if (prev.find(b => b.id === job.id)) return prev;
      return [...prev, job];
    });
  }, []);

  const removeBookmark = useCallback((jobId) => {
    setBookmarks(prev => prev.filter(b => b.id !== jobId));
  }, []);

  const isBookmarked = useCallback((jobId) => {
    return bookmarks.some(b => b.id === jobId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((job) => {
    if (bookmarks.some(b => b.id === job.id)) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  }, [bookmarks, addBookmark, removeBookmark]);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
}
