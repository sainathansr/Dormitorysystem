import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const dormIdCredential = localStorage.getItem('dormIdcredential');
    const parsedData = JSON.parse(dormIdCredential);

    let dormitoryId = parsedData.newDormitoryId;

    // Fetch room details with currentAvailability set to "Available"
    useEffect(() => {
    const fetchRooms = async () => {
        try {

   


            if (!dormitoryId) {
                setError('No dormitory ID found in credentials.');
                setLoading(false);
                return;
            }

            const response = await fetch(`https://mdms-three.vercel.app/api/roomsavailable?dormitoryId=${dormitoryId}`); // Ensure this matches your server endpoint

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
            setLoading(false); // Set loading to false once fetching is done
        }
    };

    // Use useEffect to call fetchRooms when component mounts
   
        fetchRooms();
    }, [dormitoryId]); // Empty dependency array ensures this only runs once on mount

    const handleRoomClick = (room) => {
        // Store the entire room object in local storage
        localStorage.setItem('selectedRoom', JSON.stringify(room));
        navigate(`/roomupdate/${room.roomNumber}`);
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
                                    <p>Capacity: {room.capacity}</p>
                                    <p>Current Availability: {room.currentAvailability}</p>
                                    <p>Available From: {(() => {
                                       const dateParts = room.availableFrom.split("T")[0].split("-");
                                        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                                        })()}
                                    </p>
                                    <p>Monthly Rate: {room.monthlyRate}</p>
                                    <p>Room Type: {room.roomType}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-rooms">No available rooms found.</p>
                    )}
                </>
            )}
            <button className="button" onClick={() => navigate('/addroom')}>Add Room</button>
        </div>
    );
};

export default DisplayRoom;
