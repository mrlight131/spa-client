import Header from "./components/Header.jsx";
// import Sidebar from "./components/Sidebar.jsx";
import HomePage from "./pages/homepage.jsx";
import { AppRoutes } from "./routes.jsx";
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

export default function App() {

  return (
    <Router>
      <Header />
      <AppRoutes />
      {/* <HomePage /> */}
      {/* <Sidebar /> */}
    </Router>
  );
}
