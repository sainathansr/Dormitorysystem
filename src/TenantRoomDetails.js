import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TenantRoomDetails.css';


const TenantRoomDetails = () => {
    const [roomDetails, setRoomDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { roomNumber } = useParams(); // Get room number from URL params

    // Get dormitory ID from local storage (or any other state management)
    const dormitoryId = JSON.parse(localStorage.getItem('TenantSelectedDormitory'))?.dormId;

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
               
                if (!dormitoryId) {
                    setError('Dormitory not selected or available.');
                    setLoading(false);
                    return;
                }

                // Make API request with both roomNumber and dormitoryId
                const response = await fetch(`https://mdms-three.vercel.app/api/rooms/${roomNumber}/${dormitoryId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch room details.');
                }

                const data = await response.json();

                if (!data || Object.keys(data).length === 0) {
                    setError('Room details not found.');
                    setLoading(false);
                    return;
                }

                setRoomDetails(data); // Set room details from API response
                setLoading(false);
            } catch (err) {
                setError('Failed to load room details.');
                console.error(err);
                setLoading(false);
            }
        };

        fetchRoomDetails();
    });

    const handleBackToRooms = () => {
        navigate('/tenantroomdisplay'); // Navigate back to the room listing
    };

    if (loading) {
        return <p>Loading room details...</p>;
    }

    return (
        <div className="container">
            <h2>Room Details</h2>
            {error && <p className="error-message">{error}</p>}
            {roomDetails ? (
                <div>
                    <h3>Room Number: {roomDetails.roomNumber}</h3>
                    <p><strong>Capacity:</strong> {roomDetails.capacity}</p>
                    <p><strong>Current Availability:</strong> {roomDetails.currentAvailability}</p>
                    {/* <p><strong>Available From:</strong> {roomDetails.availableFrom}</p> */}
                    <p><strong>Available From:</strong>{" "}
                        {roomDetails.availableFrom &&(() => {const dateParts = roomDetails.availableFrom.split("T")[0].split("-");
                         return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;})()}
                    </p>

                    <p><strong>Monthly Rate:</strong> {roomDetails.monthlyRate}</p>
                    <p><strong>Deposit Required:</strong> {roomDetails.depositRequired}</p>
                    <p><strong>Room Type:</strong> {roomDetails.roomType}</p>
                    
                    <div>
                        <strong>Amenities:</strong>
                        <div>{(roomDetails.amenities).map((y) => <div key={y}>{y}</div>)}</div>
                    </div>


                    <p><strong>Description:</strong> {roomDetails.descriptions}</p> {/* Assuming there's a description field */}

                    <button onClick={handleBackToRooms}>Back to Room List</button>
                </div>
            ) : (
                <p>No details available for this room.</p>
            )}
        </div>
    );
};

export default TenantRoomDetails;
