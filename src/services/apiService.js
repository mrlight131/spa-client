const API_BASE_URL = 'http://dev.toolsdiscont.com';

export const apiService = {
  // Получить классы оборудования
  async getEquipmentClasses() {
    try {
      const response = await fetch('/bff-client/classes');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  // Получить категории для конкретного класса
  async getCategoriesByClass(classId) {
    try {
      const response = await fetch(`/bff-client/categories/${classId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Получить подкатегории для конкретной категории
  async getSubcategoriesByCategory(categoryId) {
    try {
      const response = await fetch(`/bff-client/subcategories/${categoryId}`);
      // console.log(response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  },

  async getManufacturers(classId = null, categoryId = null, subcategoryId = null, page = 1, size = 10) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString()
      });

      let endpoint = '/bff-client/manufacturers';
      
      if (subcategoryId) {
        endpoint += `/${subcategoryId}`;
      } else if (categoryId) {
        endpoint += `/${categoryId}`;
      } else if (classId) {
        endpoint += `/${classId}`;
      } else {
        throw new Error('Не указан ни один из параметров: classId, categoryId или subcategoryId');
      }

      const response = await fetch(`${endpoint}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  }
};