import { useEffect } from 'react';

/**
 * Custom hook to dynamically update document.title
 * @param {string} title 
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
