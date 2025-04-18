// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import TenantLogin from './TenantLogin';
import RenterLogin from './RenterLogin';
import RenterRegister from './RenterRegister';
import TenantRegister from './TenantRegister';
import DormitoryAdd from './DormitoryAdd';
import DormitoryDetails from './DormitoryDetails';
import DormitoryList from './DormitoryList';
import AddRoom from './AddRoom';
import DormitoryUpdate from './Dormitoryupdate';
import DisplayRoom from './DisplayRoom';
import './App.css'; // Import your CSS file
import Roomupdate from './Roomupdate';
import TenantRoomDisplay from './TenantRoomDisplay';
import TenantRoomDetails from './TenantRoomDetails';
import MapPage from './MapPage';

const Home = () => (
    <div>
        <p>Please select your login option above.</p>
    </div>
);

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const showButtons = ['/'];

    return (
        <div className="app-container">
            {/* Title for the entire app */}
            <header className="app-title">
                <h1>Dormitory Management System</h1>
                <p>portal for managing dormitories and rooms</p>
            </header>
            
            {/* Render buttons only on specific routes */}
            {showButtons.includes(location.pathname) && (
                <div className="button-container">
                    <button className="blue-button" onClick={() => navigate('/tenantlogin')}>Tenant Login</button>
                    <button className="green-button" onClick={() => navigate('/renterlogin')}>Renter Login</button>
                </div>
            )}
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tenantlogin" element={<TenantLogin />} />
                <Route path="/renterlogin" element={<RenterLogin />} />
                <Route path="/tenantregister" element={<TenantRegister />} />
                <Route path="/renterregister" element={<RenterRegister />} />
                <Route path="/dormitoryadd" element={<DormitoryAdd />} />
                <Route path="/dormitorylist" element={<DormitoryList />} />
                <Route path="/dormitorydetails" element={<DormitoryDetails />} />
                <Route path="/dormitoryupdate/:dormitoryId" element={<DormitoryUpdate />} />
                <Route path="/tenantroomdisplay/:dormitoryId" element={<TenantRoomDisplay />} />
                <Route path="/tenantroomdisplay" element={<TenantRoomDisplay />} />
                <Route path="/tenantroomdetails/:roomNumber" element={<TenantRoomDetails />} />
                <Route path="/dormitoryupdate" element={<DormitoryUpdate />} />
                <Route path="/displayroom" element={<DisplayRoom />} />
                <Route path="/roomupdate/:dormitoryId" element={<Roomupdate />} />
                <Route path="/addroom" element={<AddRoom />} />
                <Route path="/mappage" element={<MapPage />} />
            </Routes>
        </div>
    );
};

const Main = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default Main;
