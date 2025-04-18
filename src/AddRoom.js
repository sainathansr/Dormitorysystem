import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRoom.css';
import axios from 'axios';

const roomTypeOptions = [
    { value: 'Shared', label: 'Shared' },
    { value: 'Not Shared', label: 'Not Shared' }
];

const amenitiesOptions = [
    { value: 'Fan', label: 'Fan' },
    { value: 'Air Conditioner', label: 'Air Conditioner' },
    { value: 'Hot Water', label: 'Hot Water' },
    { value: 'WiFi', label: 'WiFi' },
    { value: 'Cots', label: 'Cots' },
    { value: 'Food', label: 'Food' }
];

const AddRoom = () => {
    let dormitoryId = '';
    try {
        const dormitoryData = localStorage.getItem('dormIdcredential');
        dormitoryId = dormitoryData ? JSON.parse(dormitoryData).newDormitoryId : '';
        console.log(dormitoryId);
    } catch (error) {
        console.error("Error parsing dormitory data from localStorage:", error);
    }

    const [roomData, setRoomData] = useState({
        roomNumber: '',
        capacity: '',
        currentAvailability: '',
        availableFrom: '',
        monthlyRate: '',
        roomType: '',
        depositRequired: '',
        duration: '',
        description: '',
        amenities: [],
        dormitoryId: dormitoryId || ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomDataWithJsonAmenities = {
            ...roomData,
            amenities: JSON.stringify(roomData.amenities),
        };
        try {
            const response = await axios.post('https://mdms-three.vercel.app/api/addroom', roomDataWithJsonAmenities);
            console.log(response.data);
            alert('Successfully updated details');
            navigate('/displayroom');
        } catch (error) {
            console.error('Error adding room details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    

    const handleAmenityChange = (e) => {
        const value = e.target.value;
        setRoomData((prevData) => ({
            ...prevData,
            amenities: prevData.amenities.includes(value)
                ? prevData.amenities.filter((amenity) => amenity !== value)
                : [...prevData.amenities, value]
        }));
    };

    return (
        <div className="add-room">
            <h2>Add Room Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="roomNumber">Room Number:</label>
                    <input
                        type="text"
                        id="roomNumber"
                        name="roomNumber"
                        placeholder="Room Number"
                        value={roomData.roomNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        placeholder="Capacity"
                        value={roomData.capacity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currentAvailability">Current Availability:</label>
                    <input
                        type="number"
                        id="currentAvailability"
                        name="currentAvailability"
                        placeholder="Current Availability"
                        value={roomData.currentAvailability}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="availableFrom">Available From:</label>
                    <input
                        type="date"
                        id="availableFrom"
                        name="availableFrom"
                        placeholder="Available From"
                        value={roomData.availableFrom}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="monthlyRate">Monthly Rate:</label>
                    <input
                        type="number"
                        id="monthlyRate"
                        name="monthlyRate"
                        placeholder="Monthly Rate"
                        value={roomData.monthlyRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="roomType">Room Type:</label>
                    <select
                        id="roomType"
                        name="roomType"
                        value={roomData.roomType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Room Type</option>
                        {roomTypeOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="depositRequired">Deposit Required:</label>
                    <input
                        type="number"
                        id="depositRequired"
                        name="depositRequired"
                        placeholder="Deposit Required"
                        value={roomData.depositRequired}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration (in months):</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        placeholder="Duration (in months)"
                        value={roomData.duration}
                        onChange={handleInputChange}
                        required
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
                    checked={roomData.amenities.includes(amenity.value)}
                    onChange={handleAmenityChange}
                />
                <label>{amenity.label}</label>
            </div>
        ))}
    </div>
</div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={roomData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddRoom;
