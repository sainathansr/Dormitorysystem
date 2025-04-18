// TenantRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TenantRegister.css';

const TenantRegister = () => {
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Password confirmation validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(username);
        console.log(gender);
        console.log(email);
        console.log(mobile);
        console.log(password);
        console.log(confirmPassword);

        try {
            const response = await axios.post('https://mdms-three.vercel.app/api/tenantregister', {
                username,
                gender,
                email,
                mobile,
                password,
            });
            console.log('Registration successful:', response.data);
            alert('registration successful')
            navigate('/tenantlogin');
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="tenant-register-container">
            <h2>Tenant Registration</h2>
            <form onSubmit={handleRegister} className="tenant-register-form">
    <div>
        <label htmlFor="username">Username:</label>
        <input 
            id="username"
            type="text" 
            placeholder="Enter your username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
        />
    </div>
    <div>
        <label htmlFor="gender">Gender:</label>
        <select 
            id="gender"
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            required
        >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
    </div>
    <div>
        <label htmlFor="email">Email:</label>
        <input 
            id="email"
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
        />
    </div>
    <div>
        <label htmlFor="mobile">Mobile Number:</label>
        <input 
            id="mobile"
            type="text" 
            placeholder="Enter your mobile number" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
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
    <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input 
            id="confirmPassword"
            type="password" 
            placeholder="Confirm your password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
        />
    </div>
    <button type="submit">Register</button>
</form>

            <p>Already registered? <a href="/tenantlogin">Login here</a></p>
        </div>
    );
};

export default TenantRegister;
