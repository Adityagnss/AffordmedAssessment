const axios = require('axios');

async function register() {
    try {
        const response = await axios.post('http://20.244.56.144/test/register', {
            companyName: "NAGA SRI SAI ADITYA GADEY", // Using your name as company name
            ownerName: "Sri Aditya",
            rollNo: "RA2211028010192", // Please replace with your actual roll number
            ownerEmail: "ng4521@srmist.edu.in", // Please replace with your actual college email
            accessCode: "SUfGJv"
        });
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw error;
    }
}

register();
