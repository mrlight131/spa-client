export default function Dropdown({
  title = 'Выберите опцию',
  items = [],
  variant = 'secondary',
  size = '',
  className ='',
  disabled = false,
  onSelect = null // Новый пропс для обработки выбора
}){
    return (
      <div className={`dropdown ${className}`}>
        <button
          className={`btn btn-${variant} dropdown-toggle ${size} ${disabled ? 'disabled' : ''}`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          disabled={disabled}
          style = {{
            backgroundColor: 'white',
            color: 'black',
            borderColor: 'white',
            borderRadius: '15px',
            width: '100%'
            
          }}
          >
          {title}
        </button>
        <ul className="dropdown-menu">
          {items.length === 0 ? (
            <li><span className="dropdown-item-text">Нет элементов</span></li>
            ) : (
            items.map((item, index) => (
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
                  {item.label}
                </a>
              </li>
            ))
          )}
      </ul>
    </div>
    );
  }