import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TenantRoomDisplay.css';


const TenantRoomDisplay = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Get dormitoryId from localStorage, handle case if it's null
    const parsedData = localStorage.getItem('TenantSelectedDormitory');
    const dormitoryId = parsedData ? JSON.parse(parsedData).dormId : null;

    // Fetch room details with currentAvailability set to "Available"
    
        const fetchRooms = async () => {
            if (!dormitoryId) {
                setError('No dormitory selected or invalid data.');
                setLoading(false);
                return;
            }

            try {
                // Ensure this fetch is inside an async function
                const response = await fetch(`https://mdms-three.vercel.app/api/tenantrooms?dormitoryId=${dormitoryId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setRooms(data);
                setError(''); // Clear any previous error
            } catch (error) {
                console.error('Error fetching available rooms:', error);
                setError('Failed to fetch available rooms. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        useEffect(() => {
        fetchRooms(); // Call the async function
    }); // The effect should depend on dormitoryId

    const handleRoomClick = (room) => {
        // Store the room object in local storage for tenant-specific selection
        localStorage.setItem('tenantSelectedRoom', JSON.stringify(room));
        navigate(`/tenantroomdetails/${room.roomNumber}`);  // Use template literal here
    };

    return (
        <div className="container">
            <h2>Available Rooms</h2>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    {/* Display available rooms */}
                    {rooms.length > 0 ? (
                        <ul>
                            {rooms.map((room) => (
                                <li key={room.roomNumber} onClick={() => handleRoomClick(room)}>
                                    <h3>Room Number: {room.roomNumber}</h3>
                                    {/* <p>Capacity: {room.capacity}</p> */}
                                    <p>Current Availability: {room.currentAvailability}</p>
                                    {/* <p>Available From: {room.availableFrom}</p> */}
                                    <p>Available From: {room.availableFrom && (() => {
                                        const dateParts = room.availableFrom.split("T")[0].split("-");
                                        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                                    })()}
                                    </p>

                                    {/* <p>Monthly Rate: {room.monthlyRate}</p>
                                    <p>Room Type: {room.roomType}</p> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-rooms">No available tenant rooms found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default TenantRoomDisplay;
