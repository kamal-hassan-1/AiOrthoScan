const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
module.exports = (db) => {
    // Access the "diagnose" collection in the database
    const diagnoseCollection = db.collection('diagnose');

    // Define the folder for public access to uploaded images
    const UPLOAD_DIR = path.join(__dirname, 'Images');
    console.log(UPLOAD_DIR);
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Configure multer for file upload
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_DIR); // Set the upload directory
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`; // Unique name for the file
            cb(null, uniqueName);
        },
    });

    const fileFilter = (req, file, cb) => {
        const fileTypes = ['image/png', 'image/jpeg']; // Allowed MIME types
        if (fileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PNG and JPG images are allowed'), false);
        }
    };

    const upload = multer({
        storage,
        fileFilter,
    });

    // POST: Upload Image
    router.post('/uploadImage', upload.single('image'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded or invalid file type' });
            }

            // Construct the public URL for the uploaded image
            const publicUrl = `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`;
            res.status(200).json({ message: 'Image uploaded successfully', url: publicUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while uploading the image' });
        }
    });
    //User enters Relevant Data
    router.post('/uploadDiagnoseData', async (req, res) => {
        try {
            const { relevantData } = req.body;

            // Validate the input
            if (!relevantData || typeof relevantData !== 'string') {
                return res.status(400).json({ error: 'Invalid input. relevantData must be a non-empty string.' });
            }

            // Insert the data into the collection
            const result = await diagnoseCollection.insertOne({ relevantData, createdAt: new Date() });

            // Return a success response with the inserted document's ID
            res.status(200).json({ message: 'Data saved successfully', id: result.insertedId });
        } catch (error) {
            console.error('Error saving diagnose data:', error);
            res.status(500).json({ error: 'An error occurred while saving the data' });
        }
    });
    const patientRecordCollection = db.collection('patientRecord');

    // After AI analysis is complete
    router.post('/processDiagnosis', async (req, res) => {
        try {
            const { fullName, age, gender, medicalScan, diagnosisResult } = req.body;
    
            // Validate the input
            if (!fullName || !age || !gender || !medicalScan || !diagnosisResult) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            if (
                typeof diagnosisResult !== 'object' ||
                !diagnosisResult.disease ||
                !diagnosisResult.complexityStatus ||
                !diagnosisResult.confidenceScore ||
                !diagnosisResult.rehabilitationDays
            ) {
                return res.status(400).json({ error: 'Invalid diagnosisResult structure' });
            }
            
    
            const patientRecord = {
                firstName: fullName.split(" ")[0], // Extract first name
                age, // From diagnosis input
                gender, // From diagnosis input
                IDNumber: `PR${uuidv4()}`, // Generate unique ID
                disease: diagnosisResult.disease, // From AI output
                complexityStatus: diagnosisResult.complexityStatus, // From AI output
                confidenceScore: diagnosisResult.confidenceScore, // From AI output
                daysInRehabilitation: diagnosisResult.rehabilitationDays, // From AI output
                medicalScan, // URL of uploaded scan
                createdAt: new Date(),
            };
    
            // Save the record
            await patientRecordCollection.insertOne(patientRecord);
    
            res.status(201).json({ message: 'Diagnosis processed and record saved', IDNumber: patientRecord.IDNumber });
        } catch (error) {
            console.error('Error saving patient record:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    //DATA FETCH IN PATIENT DIGITAL RECORD
    router.get('/patientRecords/:id', async (req, res) => {
        try {
            const record = await patientRecordCollection.findOne({ IDNumber: req.params.id });

            if (!record) {
                return res.status(404).json({ error: 'Record not found' });
            }

            res.status(200).json(record);
        } catch (error) {
            console.error('Error fetching patient record:', error);
            res.status(500).json({ error: 'Failed to fetch patient record' });
        }
    });


    //catch multer error
    router.use((err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: `Multer error: ${err.message}` });
        }
        next(err);
    });

    return router;
};
