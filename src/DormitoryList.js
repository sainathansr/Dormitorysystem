import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DormitoryList.css'; 

const DormitoryList = () => {
    const [dormitories, setDormitories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const navigate = useNavigate();

    const fetchDormitories = async () => {
        try {
            const response = await fetch('https://mdms-three.vercel.app/api/dormitoriesList'); 
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setDormitories(data);
            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Error fetching available dormitories:', error);
            setError('Failed to fetch available dormitories. Please try again later.'); // Set the error message
        } finally {
            setLoading(false); // Set loading to false once fetching is done
        }
    };

    useEffect(() => {
        fetchDormitories();
    }, []);

    const navigateToGoogleMaps = (dorm) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${dorm.location}`;
        window.open(googleMapsUrl, '_blank');
    };

    const handleDormitoryClick = (dorm) => {
        localStorage.setItem('TenantSelectedDormitory', JSON.stringify({ dormId: dorm.dormitoryId }));
        navigate(`/tenantroomdisplay/${dorm.dormitoryId}`);
    };

    // Filter dormitories based on the search query (by name, address, district, or state)
    const filteredDormitories = dormitories.filter((dorm) =>
        dorm.dormitoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dorm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dorm.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dorm.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Available Dormitories</h2>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search dormitories by name, address, district, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    {filteredDormitories.length > 0 ? (
                        <ul>
                            {filteredDormitories.map((dorm) => (
                                <li key={dorm.dormitoryId} onClick={() => handleDormitoryClick(dorm)}>
                                    <h3>{dorm.dormitoryName}</h3>
                                    <p>Gender: {dorm.dormitoryGender}</p>
                                    <p>Address: {dorm.address}, {dorm.district}, {dorm.state}</p>
                                    <p>Mobile no: {dorm.renter_mobile}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the parent onClick
                                            navigateToGoogleMaps(dorm);
                                        }}
                                    >
                                        View Location on Google Maps
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-dormitories">No available dormitories found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default DormitoryList;
