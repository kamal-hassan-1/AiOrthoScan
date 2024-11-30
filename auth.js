const express = require('express');
const session = require('express-session');

const bcrypt = require('bcrypt'); // For secure password hashing (optional but recommended)

const router = express.Router();
module.exports = (db) => {
    const usersCollection = db.collection('users');

    // Signup functionality
    router.post('/signup', async (req, res) => {
        const { fullName, cnic, email, password, confirmPassword } = req.body;

        // Validation function
        function areDetailsValid(fullName, cnic, email, password, confirmPassword) {
            if (!fullName || !cnic || !email || !password || !confirmPassword) {
                return false;
            }
            if (!/^\d{13}$/.test(cnic)) {
                return false; // Invalid CNIC
            }
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
            if (!passwordPattern.test(password) || password !== confirmPassword) {
                return false; // Password validation failed
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return false; // Invalid email
            }
            return true;
        }

        // Validate user input
        if (!areDetailsValid(fullName, cnic, email, password, confirmPassword)) {
            return res.status(400).json({ error: 'Invalid user details' });
        }

        try {
            // Check if the email already exists
            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ error: 'Email already registered' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save the user to the database
            const newUser = {
                fullName,
                cnic,
                email,
                password: hashedPassword,
                createdAt: new Date(),
            };

            await usersCollection.insertOne(newUser);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Login functionality
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            // Find the user in the database
            const user = await usersCollection.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Verify the password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Set session without storing user data
            req.session.isAuthenticated = true; // Mark session as authenticated

            res.status(200).json({ message: 'Login successful', sessionId: req.sessionID });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
}
