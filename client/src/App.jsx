import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PropertyList from './pages/PropertyList.jsx';
import PropertyDetail from './pages/PropertyDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import AgentDashboard from './pages/AgentDashboard.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<AgentDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
