import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useManufacturers } from '../hooks/useManufacturers.jsx';

export default function ManufacturersPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId, categoryId, subcategoryId } = location.state || {};
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const { manufacturers, isLoading, error, pagination } =  useManufacturers(classId, categoryId, subcategoryId, currentPage, pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении размера
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSearchLevelText = () => {
    if (subcategoryId) return 'подкатегории';
    if (categoryId) return 'категории';
    if (classId) return 'класса';
    return '';
  };

  const getSelectedNames = () => {
    if (subcategoryId) return 'подкатегории';
    if (categoryId) return 'категории';
    if (classId) return 'класса';
    return '';
  };

  if (!classId && !categoryId && !subcategoryId) {
    return (
      <main className="manufacturersPage container py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Ошибка!</h4>
          <p>Не выбраны параметры поиска. Пожалуйста, вернитесь на главную страницу и выберите хотя бы класс оборудования.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="manufacturersPage container py-5">
      <div className="row" style = {{marginTop: '5%'}}>
        <div className="col-12 mb-3">
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/')}
          >
            ← Назад к поиску
          </button>
        </div>
        <div className="col-12">
          <h2 className="mb-4">Производители оборудования</h2>
          
          {/* Информация о пагинации */}
          {pagination.totalElements > 0 && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0">
                Показано {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, pagination.totalElements)} из {pagination.totalElements} производителей
              </p>
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted">Показывать:</span>
                <select 
                  className="form-select form-select-sm"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                  style={{ width: 'auto' }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          )}
        
          {isLoading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-2">Загрузка производителей...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Ошибка загрузки данных</h4>
              <p>{error}</p>
              <button 
                className="btn btn-outline-danger mt-2"
                onClick={() => window.location.reload()}
              >
                Попробовать снова
              </button>
            </div>
          )}

          {!isLoading && !error && manufacturers.length === 0 && (
            <div className="alert alert-info" role="alert">
              <h4 className="alert-heading">Нет производителей</h4>
              <p>По выбранной подкатегории производителей не найдено.</p>
            </div>
          )}

          {!isLoading && !error && manufacturers.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">№</th>
                      <th scope="col">Производитель</th>
                      <th scope="col">Код</th>
                      <th scope="col">Номер телефона</th>
                      <th scope="col">Факс</th>
                      <th scope="col">Email</th>
                      <th scope="col">Сайт</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manufacturers.map((manufacturer, index) => (
                      <tr key={manufacturer.id}>
                        <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                        <td>
                          <strong>{manufacturer.name}</strong>
                        </td>
                        <td>{manufacturer.code}</td>
                        <td>{manufacturer.phone}</td>
                        <td>{manufacturer.fax}</td>
                        <td>
                          {manufacturer.mail ? (
                            <a href={`mailto:${manufacturer.mail}`} className="text-decoration-none">
                              {manufacturer.mail}
                            </a>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          {manufacturer.website_url ? (
                            <a href={manufacturer.website_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                              {manufacturer.website_url.replace(/^https?:\/\//, '')}
                            </a>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Пагинация */}
              {pagination.totalPages > 1 && (
                <nav aria-label="Навигация по страницам">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${!pagination.hasPrev ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrev}
                      >
                        Предыдущая
                      </button>
                    </li>
                    
                    {/* Нумерация страниц */}
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter(pageNum => {
                        return pageNum <= 3 || 
                               pageNum > pagination.totalPages - 3 || 
                               Math.abs(pageNum - currentPage) <= 1;
                      })
                      .map((pageNum, index, array) => {
                        if (index > 0 && pageNum - array[index - 1] > 1) {
                          return [
                            <li key={`ellipsis-${pageNum}`} className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>,
                            <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                              <button 
                                className="page-link" 
                                onClick={() => handlePageChange(pageNum)}
                              >
                                {pageNum}
                              </button>
                            </li>
                          ];
                        }
                        
                        return (
                          <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        );
                      })}

                    <li className={`page-item ${!pagination.hasNext ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNext}
                      >
                        Следующая
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}