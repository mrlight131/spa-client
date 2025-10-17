import { useState, useEffect } from "react";
import { apiService } from '../services/apiService.js';

// export const useFetch = (url, params) => {
//   const [request, setRequest] = useState({
//     data: null,
//     isLoading: true,
//   });

//   useEffect(() => {
//     // Имитация загрузки данных
//     const timer = setTimeout(() => {
//       setRequest({ 
//         data: mockCategories, 
//         isLoading: false 
//       });
//     }, 300); // Небольшая задержка для имитации загрузки

//     return () => clearTimeout(timer);
//   }, [url]);

//   return {
//     data: request.data,
//     isLoading: request.isLoading,
//   };
// };


export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getEquipmentClasses();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classes, isLoading, error };
};

export const useCategories = (classId) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!classId) {
      setCategories([]);
      return;
    }

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getCategoriesByClass(classId);
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [classId]);

  return { categories, isLoading, error };
};

export const useSubcategories = (categoryId) => {
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getSubcategoriesByCategory(categoryId);
        setSubcategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  return { subcategories, isLoading, error };
};