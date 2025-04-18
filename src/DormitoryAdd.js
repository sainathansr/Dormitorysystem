
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DormitoryList.css'; // Import the CSS file


// const renterCredentials = localStorage.getItem('renterCredentials');
// let mobileNumber = renterCredentials ? JSON.parse(renterCredentials).mobileNumber:null;
// console.log(mobileNumber)

const DormitoryList = () => {
    const [dormitories, setDormitories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const renterCredentials = localStorage.getItem('renterCredentials');
    const mobileNumber = renterCredentials ? JSON.parse(renterCredentials).mobileNumber : null;

    // const renterCredentials = localStorage.getItem('renterCredentials');
    //         let mobileNumber = renterCredentials ? JSON.parse(renterCredentials).mobileNumber;
    //         console.log(mobileNumber)

    // Fetch dormitory details with dormAvailable set to "Available"
    useEffect(()=>{
    const fetchDormitories = async () => {
        try {
            ;

            if (!mobileNumber) {
                setError('No mobile number found in credentials.');
                setLoading(false);
                return;
            }
            const response = await fetch(`https://mdms-three.vercel.app/api/dormitoriesavailable?mobileNumber=${mobileNumber}`); // Ensure this matches your server endpoint

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
    fetchDormitories();
    },[mobileNumber]);

    // Use useEffect to call fetchDormitories when component mounts
    // useEffect(() => {
    //     fetchDormitories();
    // }, [fetchDormitories]); // Empty dependency array ensures this only runs once on mount

    const handleDormitoryClick = (dorm) => {
        // Store dormitory details in local storage
        localStorage.setItem('selectedDormitory', JSON.stringify(dorm));
        navigate(`/dormitoryupdate/${dorm.dormitoryId}`);
    };
    // const handleroomClick = (e,dorm) => {
    //     e.stopPropagation();
    //     // Save dormitoryId to local storage and navigate to room update page
    //     localStorage.setItem('dormIdcredential', JSON.stringify({ newDormitoryId: dorm.dormitoryId }));
    //     navigate('/displayroom');
    // };
    const handleroomClick = (event, dorm) => {
        event.stopPropagation(); // Stop event propagation to prevent triggering the parent onClick
        // localStorage.clear('dormIdcredentail');

        localStorage.setItem('dormIdcredential', JSON.stringify({ newDormitoryId: dorm.dormitoryId }));
        console.log(JSON.parse(localStorage.getItem('dormIdcredential')));
        navigate('/displayroom');
    };
    

    return (
        <div className="container">
            <h2>All Dormitories</h2>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    {/* Display available dormitories */}                   
                    {dormitories.length > 0 ? (
                        <ul>
                            {dormitories.map((dorm) => (
                                <li key={dorm.dormitoryId} onClick={() => handleDormitoryClick(dorm)}>
                                    <h3>{dorm.dormitoryName}</h3>
                                    {/* <p>Location: {dorm.searchLocation}</p> */}
                                    <p>Gender: {dorm.dormitoryGender}</p>
                                    <p>Address: {dorm.address},{dorm.district},{dorm.state}</p>
                                    {/* <p>District: {dorm.district}</p>
                                    <p>State: {dorm.state}</p>
                                    <p>Pincode: {dorm.pincode}</p> */}
                                    <p>Status: {dorm.dormAvailable}</p>
                                    {/* update button */}
                                    <button 
                                            className="small-button" 
                                            onClick={(event) => handleroomClick(event, dorm)} >Rooms Details
                                    </button>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-dormitories">No available dormitories found.</p>
                    )}
                </>
            )}
            <button className="button" onClick={() => navigate('/dormitorydetails')}>Add Dormitory</button>
            
        </div>
    );
};

export default DormitoryList;
