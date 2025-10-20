import { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService.js';

export default function Dropdown({
  title = 'Выберите опцию',
  items = [],
  variant = 'secondary',
  size = '',
  className ='',
  disabled = false,
  onSelect = null, // Новый пропс для обработки выбора
  dataType = null, // 'classes', 'categories', 'subcategories'
  parentId = null, // classId для categories, categoryId для subcategories
  onDataLoad = null // callback для передачи загруженных данных
}){
  const [isLoading, setIsLoading] = useState(false);
  const [internalItems, setInternalItems] = useState(items);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!dataType) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let data = [];
        switch (dataType) {
          case 'classes':
            data = await apiService.getEquipmentClasses();
            break;
          case 'categories':
            if (parentId) {
              data = await apiService.getCategoriesByClass(parentId);
            }
            break;
          case 'subcategories':
            if (parentId) {
              data = await apiService.getSubcategoriesByCategory(parentId);
            }
            break;
          default:
            break;
        }

        setInternalItems(data);
        if (onDataLoad) {
          onDataLoad(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dataType, parentId]);

    return (
      <div className={`dropdown ${className}`}>
      <button
        className={`btn btn-${variant} dropdown-toggle ${size} ${disabled || isLoading ? 'disabled' : ''}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={disabled || isLoading}
        style={{
          backgroundColor: 'white',
          color: 'black',
          borderColor: 'white',
          borderRadius: '15px',
          width: '100%',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Загрузка...' : title}
      </button>
      <ul className="dropdown-menu">
        {isLoading ? (
          <li><span className="dropdown-item-text">Загрузка...</span></li>
        ) : error ? (
          <li><span className="dropdown-item-text text-danger">Ошибка: {error}</span></li>
        ) : internalItems.length === 0 ? (
          <li><span className="dropdown-item-text">Нет элементов</span></li>
        ) : (
          internalItems.map((item, index) => (
            <li key={index}>
              <a 
                className={`dropdown-item ${item.active ? 'active' : ''}`} 
                href={item.href || "#"}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.onClick) {
                    item.onClick();
                  }
                  if (onSelect) {
                    onSelect(item);
                  }
                }}
              >
                {item.icon && <span className="me-2">{item.icon}</span>}
                {item.name || item.label}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
    );
  }