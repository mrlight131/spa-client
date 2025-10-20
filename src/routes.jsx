import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/homepage.jsx";
import ManufacturersPage from "./pages/manufacturersPage.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/manufacturers" element={<ManufacturersPage />} />
      
    </Routes>
  );
};

// Экспортируем константы путей для удобства использования в других компонентах
export const ROUTES = {
  HOME: '/',
  MANUFACTURERS: '/manufacturers',
};