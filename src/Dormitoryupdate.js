import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './DormitoryUpdatePage.css'; // Import your CSS file

const states = [
    // (Your states and districts array here)

    { name: "Andhra Pradesh", districts: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Y.S.R. Kadapa"] },
    { name: "Arunachal Pradesh", districts: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Lower Subansiri", "Upper Subansiri", "West Siang", "Shi Yomi", "East Siang", "Siang", "Lower Siang", "Namsai", "Changlang", "Tawang"] },
    { name: "Assam", districts: ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Charaideo", "Darrang", "Dhemaji", "Dibrugarh", "Diphu", "Guwahati", "Hailakandi", "Jorhat", "Kamrup", "Karbi Anglong", "Karimganj", "Lakhimpur", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri", "West Karbi Anglong"] },
    { name: "Bihar", districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bihar Sharif", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Nalanda", "Nawada", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Supaul", "Vaishali", "West Champaran"] },
    { name: "Chhattisgarh", districts: ["Balod", "Baloda Bazar", "Balrampur", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "JanJGhar", "Jashpur", "Kanker", "Kondagaon", "Korba", "Mahasamund", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Surajpur", "Surguja"] },
    { name: "Goa", districts: ["North Goa", "South Goa"] },
    { name: "Gujarat", districts: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dangs", "Gandhinagar", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Vadodara", "Valsad"] },
    { name: "Haryana", districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Mahendragarh", "Nuh", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
    { name: "Himachal Pradesh", districts: ["Bilaspur", "Chamba", "Hamirpur", "Kinnaur", "Kullu", "Lahaul and Spiti", "Shimla", "Sirmaur", "Solan", "Una"] },
    { name: "Jharkhand", districts: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"] },
    { name: "Karnataka", districts: ["Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Yadgir"] },
    { name: "Kerala", districts: ["Alappuzha", "Ernakulam", "Idukki", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
    { name: "Madhya Pradesh", districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandsaur", "Mandla", "Morena", "Nagda", "Narmadapuram", "Neemuch", "Panna", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Shahdol", "Shajapur", "Sheopur", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
    { name: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalna", "Jalgaon", "Kolhapur", "Mumbai", "Mumbai Suburban", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
    { name: "Manipur", districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Thoubal", "Ukhrul"] },
    { name: "Meghalaya", districts: ["East Garo Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South Khasi Hills", "West Garo Hills", "West Khasi Hills"] },
    { name: "Mizoram", districts: ["Aizawl", "Champhai", "Khawzawl", "Kolasib", "Lunglei", "Mamit", "Saiha", "Serchhip"] },
    { name: "Nagaland", districts: ["Dimapur", "Kiphire", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"] },
    { name: "Odisha", districts: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Bolangir", "Cuttack", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khurda", "Koraput", "Malkangiri", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sundargarh"] },
    { name: "Punjab", districts: ["Amritsar", "Barnala", "Batala", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "S.A.S. Nagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"] },
    { name: "Rajasthan", districts: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Karauli", "Kota", "Nagaur", "Pali", "Rajsamand", "Sawai Madhopur", "Sikar", "Tonk", "Udaipur"] },
    { name: "Sikkim", districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"] },
    { name: "Tamil Nadu", districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Tiruchirappalli", "Tirunelveli", "Tiruvarur", "Vellore", "Virudhunagar"] },
    { name: "Telangana", districts: ["Adilabad", "Hyderabad", "Jagtiyal", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Nalgonda", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"] },
    { name: "Tripura", districts: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"] },
    { name: "Uttar Pradesh", districts: ["Agra", "Aligarh", "Ambedkarnagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Banda", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chhatrapati Shahuji Maharaj Nagar", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hardoi", "Hathras", "Jhansi", "Jalaun", "Jaunpur", "Kanpur Dehat", "Kanpur Nagar", "Kanshiram Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Ravidas Nagar", "Shahjahanpur", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"] },
    { name: "Uttarakhand", districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"] },
    { name: "West Bengal", districts: ["Alipurduar", "Bankura", "Birbhum", "Bardhaman", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Malda", "Medinipur", "Murshidabad", "Nadia", "North 24 Parganas", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"] },
    { name: "Andaman and Nicobar Islands", districts: ["North and Middle Andaman", "South Andaman", "Nicobar"] },
    { name: "Chandigarh", districts: ["Chandigarh"] },
    { name: "Dadra and Nagar Haveli", districts: ["Dadra and Nagar Haveli"] },
    { name: "Daman and Diu", districts: ["Daman", "Diu"] },
    { name: "Lakshadweep", districts: ["Lakshadweep"] },
    { name: "Delhi", districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"] },
    { name: "Puducherry", districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"] },
    { name: "Jammu and Kashmir", districts: ["Jammu", "Kathua", "Kishtwar", "Poonch", "Rajouri", "Ramban", "Reasi", "Samba", "Udhampur", "Anantnag", "Bandipora", "Doda", "Ganderbal", "Kulgam", "Pulwama", "Shopian", "Srinagar"] },
    { name: "Ladakh", districts: ["Leh", "Kargil"] }
];
   




const DormitoryUpdate = () => {
    const [dormitory, setDormitory] = useState(null);
    const [error, setError] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedDormitory = localStorage.getItem('selectedDormitory');

        if (storedDormitory) {
            const dormitoryData = JSON.parse(storedDormitory);
            setDormitory(dormitoryData);
            setSelectedState(dormitoryData.state); // Set the state from the dormitory data
        } else {
            setError('No dormitory data found in local storage.');
        }
    }, []);

    useEffect(() => {
        if (selectedState) {
            const stateData = states.find(state => state.name === selectedState);
            setDistricts(stateData ? stateData.districts : []);
        }
    }, [selectedState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDormitory(prevState => ({ ...prevState, [name]: value }));
    };

   
    const handleDelete = async () => {
       
        try {
            const response = await fetch(`https://mdms-three.vercel.app/api/deletedormitory?dormitoryId=${dormitory.dormitoryId}`, {
                method: 'DELETE',
            });
            console.log("response from backend",response);
    
            if (!response.ok) {
                // If the response is not ok, log the error for debugging
                const errorText = await response.text(); // Capture the server's response
                console.error('Server Error:', errorText);
                throw new Error('Failed to delete the dormitory.');
            }
    
            const result = await response.json(); // Parse the JSON response
            alert(result.message); // Show success message
            navigate(-1); // Go back to the previous page
        } catch (error) {
            console.error('Error while deleting the dormitory:', error);
            alert('An error occurred while deleting the room. Please try again.');
        }
    };

    
    
    const handleUpdate = async (event) => {

        event.preventDefault();
        try {
            const response = await fetch(`https://mdms-three.vercel.app/api/updateDormitory`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dormitory),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Navigate to the dormitory details page or another page upon successful update
            alert('sucessfully updated');
            navigate('/dormitoryAdd');
        } catch (error) {
            setError('Failed to update dormitory: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Update Dormitory</h1>
            {error && <p>{error}</p>}
            {dormitory ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Dormitory Name:</label>
                        <input 
                            type="text" 
                            name="dormitoryName" 
                            value={dormitory.dormitoryName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>search Location:</label>
                        <input 
                            type="text" 
                            name="searchLocation" 
                            value={dormitory.searchLocation} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    {/* <div>
                    <label>Gender:</label>
                    <input
                        type="text"
                        value={dormitory.dormitoryGender}
                        onChange={(e) => setDormitory({ ...dormitory, dormitoryGender: e.target.value })}
                        required
                    />
                </div> */}
                <div>
    <label htmlFor="dormitoryGender">Dormitory Gender:</label>
    <select
        id="dormitoryGender"
        name="dormitoryGender"
        value={dormitory.dormitoryGender}
        onChange={handleChange}
        required
    >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Co-Ed">Co-Ed</option>
    </select>
</div>

                <div>
                    <label>Address:</label>
                    <input type="text" 
                    name="address" 
                    value={dormitory.address} onChange={handleChange} 
                    required />
                </div>
            
                    <div>
                        <label>State:</label>
                        <select 
                            name="state" 
                            value={selectedState} 
                            onChange={(e) => {
                                handleChange(e);
                                setSelectedState(e.target.value);
                            }} 
                            required
                        >
                            <option value="">Select State</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>District:</label>
                        <select 
                            name="district" 
                            value={dormitory.district} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    

<div>
    <label>Pincode:</label>
    <input
        type="text"
        value={dormitory.pincode}
        onChange={(e) => setDormitory({ ...dormitory, pincode: e.target.value })}
        required
    />
</div>
{/* 
<div>
    <label>Location:</label>
    <input
        type="text"
        value={dormitory.location || ''} // Ensure the input is controlled
        onChange={(e) => setDormitory({ ...dormitory, location: e.target.value })}
        required
    />
</div> */}


<div>
    <label>Dorm Availability:</label>
    <select
        value={dormitory.dormAvailable}
        onChange={(e) => setDormitory({ ...dormitory, dormAvailable: e.target.value })}
        required
    >
        <option value="" disabled>Select Availability</option>
        <option value="Available">Available</option>
        <option value="Not Available">Not Available</option>
    </select>
</div>

                    <button type="submit">Update Dormitory</button>
                    <button type="button" onClick={handleDelete}>
                        Delete dormitory Completely
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DormitoryUpdate;
