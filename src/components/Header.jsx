import CallIcon from '@mui/icons-material/Call';
import Button from "../components/UI/button.jsx";

export default function Header() {
  return (
    <header className="d-flex justify-content-between align-items-center py-3" style={{
      backgroundColor: '#606060',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
      {/* Левый блок - логотип и название */}
      <div className="d-flex align-items-center">
        
        <div className="d-flex flex-column ms-3">
          <span className="fs-4 fw-bold" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif'}}>ToolsDiscont</span>
          <span className="fs-7" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif'}}>Все производители и новинки</span>
        </div>
      </div>
      
      {/* Центральный блок - навигация */}
      <ul className="nav nav-pills mb-0 ms-20">
        <li className="nav-item "><a href="#" className="nav-link" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif', fontSize: '18px'}}>О компании</a></li>
        <li className="nav-item"><a href="#" className="nav-link" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif', fontSize: '18px'}}>Контакты</a></li>
        <li className="nav-item"><a href="#" className="nav-link" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif', fontSize: '18px'}}>Отделу Закупок</a></li>
        <li className="nav-item"><a href="#" className="nav-link" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif', fontSize: '18px'}}>Ищу специалиста</a></li>
        <li className="nav-item"><a href="#" className="nav-link" style={{color: '#ffffff', fontFamily:'Montserrat, sans-serif', fontSize: '18px'}}>Бренды</a></li>
      </ul>

      {/* Правый блок - элементы управления */}
      <div className="d-flex align-items-center gap-2 me-3">
        
        <CallIcon style={{color: '#ffffff'}} />
        <p className="mb-0 me-3" style={{color: '#ffffff'}}>+7 (391) 222-0-999</p>
        {/* <button className="btn btn-outline-light">Обратный звонок</button> */}
        <Button>Обратный звонок</Button>
      </div>
    </header>
  );
}
