const buttonStyles = `
  .btn-custom {
    border-radius: 15px !important;
    background-color:rgba(44, 62, 80, 0) !important;
    border-color: white !important;
    color: white !important
  }
  
  .btn-custom:hover {
    background-color: #FBA161 !important;
    border-color: #FBA161 !important;
    color: black !important
  }
`;
export default function Button({
    children,
    variant = 'primary',
    size = '',
    type = 'button',
    disabled = false,
    className = '',
    onClick = null,
    href = null,
    target = null,
    style = {}
  }) {
    
    
    return (
        <>
          <style>{buttonStyles}</style>
          
          {/* Если есть href, рендерим как ссылку */}
          {href ? (
            <a
              href={href}
              target={target}
              className={`btn btn-${variant} btn-custom ${size} ${disabled ? 'disabled' : ''} ${className}`}
              style={style}
              onClick={onClick}
            >
              {children}
            </a>
          ) : (
            /* Иначе рендерим как кнопку */
            <button
              type={type}
              className={`btn btn-${variant} btn-custom ${size} ${disabled ? 'disabled' : ''} ${className}`}
              disabled={disabled}
              style={style}
              onClick={onClick}
            >
              {children}
            </button>
          )}
        </>
      );
  }