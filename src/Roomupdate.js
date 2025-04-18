import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Roomupdate.css'; // Import your CSS file

const amenitiesOptions = [
    { value: 'Fan', label: 'Fan' },
    { value: 'Air Conditioner', label: 'Air Conditioner' },
    { value: 'Hot Water', label: 'Hot Water' },
    { value: 'WiFi', label: 'WiFi' },
    { value: 'Cots', label: 'Cots' },
    { value: 'Food', label: 'Food' }
];

const Roomupdate = () => {
    const [room, setRoom] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedRoom = localStorage.getItem('selectedRoom');

        if (storedRoom) {
            const roomData = JSON.parse(storedRoom);
            // Ensure availableFrom is in yyyy-MM-dd format
            if (roomData.availableFrom) {
                const availableFromDate = new Date(roomData.availableFrom);
                roomData.availableFrom = availableFromDate.toISOString().split('T')[0];
            }
            setRoom(roomData);
        } else {
            setError('No room data found in local storage.');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom(prevRoom => ({
            ...prevRoom,
            [name]: value,
        }));
    };

    const handleAmenityChange = (e) => {
        const value = e.target.value;
        setRoom(prevData => ({
            ...prevData,
            amenities: prevData.amenities.includes(value)
                ? prevData.amenities.filter(amenity => amenity !== value)
                : [...prevData.amenities, value]
        }));
    };


    const handleDelete = async () => {
        const dormitoryData = localStorage.getItem('selectedRoom');
        const dormitoryId = dormitoryData ? JSON.parse(dormitoryData).dormitoryId : '';
        try {
            const response = await fetch(`https://mdms-three.vercel.app/api/deleteroom?dormitoryId=${dormitoryId}&roomNumber=${room.roomNumber}`, {
                method: 'DELETE',
            });
            console.log("response from backend",response);
    
            if (!response.ok) {
                // If the response is not ok, log the error for debugging
                const errorText = await response.text(); // Capture the server's response
                console.error('Server Error:', errorText);
                throw new Error('Failed to delete the room.');
            }
    
            const result = await response.json(); // Parse the JSON response
            alert(result.message); // Show success message
            navigate(-1); // Go back to the previous page
        } catch (error) {
            console.error('Error while deleting the room:', error);
            alert('An error occurred while deleting the room. Please try again.');
        }
    };

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let dormitoryId = '';
        try {
            const dormitoryData = localStorage.getItem('selectedRoom');
            dormitoryId = dormitoryData ? JSON.parse(dormitoryData).dormitoryId : '';
            console.log(dormitoryId);
        } catch (error) {
            console.error("Error parsing dormitory data from localStorage:", error);
        }

        console.log(room);
        // Replace the URL with your actual API endpoint
        const response = await fetch(`https://mdms-three.vercel.app/api/updateroom?dormitoryId=${dormitoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room),
        });

        if (response.ok) {
            alert('Updated data successfully.')
            navigate('/displayroom'); // Navigate to the dormitory details page after successful update
        } else {
            setError('Failed to update the room. Please try again.');
        }
    };

    return (
        <div>
            <h1>Update Room Details</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {room ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Room Number:</label>
                        <input
                            type="text"
                            name="roomNumber"
                            value={room.roomNumber}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={room.capacity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Current Availability:</label>
                        <input
                            type="number"
                            name="currentAvailability"
                            value={room.currentAvailability}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Available From:</label>
                        <input
                            type="date"
                            name="availableFrom"
                            value={room.availableFrom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Monthly Rate:</label>
                        <input
                            type="text"
                            name="monthlyRate"
                            value={room.monthlyRate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Room Type:</label>
                        <select
                            name="roomType"
                            value={room.roomType}
                            onChange={handleChange}
                        >
                            <option value="Shared">Shared</option>
                            <option value="Not Shared">Not Shared</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Deposit Required:</label>
                        <input
                            type="text"
                            name="depositRequired"
                            value={room.depositRequired}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration:</label>
                        <input
                            type="number"
                            name="duration"
                            value={room.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
    <label>Amenities:</label>
    <div className="amenities-group">
        {amenitiesOptions.map((amenity) => (
            <div key={amenity.value} className="checkbox-container">
                <input
                    type="checkbox"
                    value={amenity.value}
                    checked={room.amenities.includes(amenity.value)}
                    onChange={handleAmenityChange}
                />
                <label>{amenity.label}</label>
            </div>
        ))}
    </div>
</div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="descriptions"
                            value={room.descriptions}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit">Update Room</button>

                    <button type="button" onClick={handleDelete}>
                        Delete Room Completely
                    </button>
                </form>
            ) : (
                <p>Loading room data...</p>
            )}
        </div>
    );
};

export default Roomupdate;
