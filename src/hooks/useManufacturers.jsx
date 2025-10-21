import { useState, useEffect } from "react";
import { apiService } from '../services/apiService.js';

export const useManufacturers = (classId = null, categoryId = null, subcategoryId = null, page = 1, size = 10) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    pageSize: 10,
    hasNext: false,
    hasPrev: false
  });

  useEffect(() => {
    if (!classId && !categoryId && !subcategoryId) {
        setManufacturers([]);
        return;
      }

    const fetchManufacturers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await apiService.getManufacturers(classId, categoryId, subcategoryId, page, size);
        
        if (response && response.data && Array.isArray(response.data)) {
          setManufacturers(response.data);
          
          if (response.meta) {
            setPagination({
              currentPage: response.meta.page || page,
              totalPages: response.meta.pages || 1,
              totalElements: response.meta.total || response.data.length,
              pageSize: response.meta.size || size,
              hasNext: response.meta.has_next || false,
              hasPrev: response.meta.has_prev || false
            });
          }
        } else {
          console.warn('Неожиданный формат ответа от API:', response);
          setManufacturers([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalElements: 0,
            pageSize: size,
            hasNext: false,
            hasPrev: false
          });
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching manufacturers:', err);
        setManufacturers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManufacturers();
  }, [classId, categoryId, subcategoryId, page, size]);

  return {manufacturers, isLoading, error, pagination};
};