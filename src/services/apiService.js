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

  async getManufacturers(subcategoryId) {
    try {
      const response = await fetch(`/bff-client/manufacturers/${subcategoryId}`);
      // console.log(response);
      
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