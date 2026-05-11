require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const User = require('./models/user-model');
const bcrypt = require('bcryptjs');

const testAI = async () => {
    try {
        // Connect to DB
        await connectDB();
        console.log('✅ Connected to MongoDB');

        // Create or find test user
        let user = await User.findOne({ email: 'aitest@test.com' });
        
        if (!user) {
            console.log('Creating test user...');
            const hashedPassword = await bcrypt.hash('TestPass123', 12);
            user = await User.create({
                name: 'AI Test User',
                email: 'aitest@test.com',
                password: hashedPassword
            });
            console.log('✅ Test user created');
        } else {
            console.log('✅ Test user found');
        }

        // Create JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        console.log('✅ Token created');
        console.log('');
        
        // Test AI endpoint
        console.log('Testing AI Recommendation Endpoint...');
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/ai-recommend', 
                { userPreference: 'I want a beautiful beach vacation' },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('✅ AI Request Success!');
            console.log('Response:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.log('❌ AI Request Failed!');
            if (error.code === 'ECONNREFUSED') {
                console.log('Connection refused - server might not be running');
            } else if (error.code === 'ENOTFOUND') {
                console.log('DNS not found - check the URL');
            } else if (error.response) {
                console.log('Status:', error.response.status);
                console.log('Message:', error.response.data?.message);
                console.log('Details:', error.response.data?.details);
            } else {
                console.log('Axios Error Code:', error.code);
                console.log('Full Error:', error);
            }
            console.log('Error String:', error.toString());
        }

        process.exit(0);
    } catch (error) {
        console.error('Setup Error:', error.message);
        process.exit(1);
    }
};

testAI();
