// TenantLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TenantLogin.css';

const TenantLogin = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://mdms-three.vercel.app/api/tenantlogin', { mobileNumber, password });
            console.log(response);

            if(response.status===200){
                navigate("/dormitoryList");
            }
        } 
        catch (error) {
            if (error.response && error.response.status === 404) {
                // Specific handling for user not found
                
                setErrorMessage('User not found. Please register.');
                alert('user not found');
            }
            if (error.response && error.response.status === 401) {
                // Specific handling for user not found
                
                setErrorMessage('Invalid password.please correct password');
                alert('invalid password');
            }
             else {
                // Generic error message for other cases
                setErrorMessage('An error occurred. Please try again later.');
            }
            console.error('Login error:', error);
        }
       
    };

    return (
        <div className="tenant-login">
            <h2>Tenant Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}
            <form onSubmit={handleLogin}>
    <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
            id="mobileNumber"
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
        />
    </div>
    <div>
        <label htmlFor="password">Password:</label>
        <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
    </div>
    <button type="submit">Login</button>
</form>

            <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/tenantregister')}>Register Now</button>
            </p>
        </div>
    );
};

export default TenantLogin;
