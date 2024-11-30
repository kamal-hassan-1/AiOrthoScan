const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Access the "aiDiagnosis" collection in the database (assumed collection)
    const aiDiagnosisCollection = db.collection('aiDiagnosis');
    
    // GET: Fetch AI Diagnosis Data
    router.get('/AiDiagnosis', async (req, res) => {
        try {
            // Fetch the AI diagnosis data from the database (can be adjusted to fetch from AI model or API)
            const diagnosisData = await aiDiagnosisCollection.findOne({});  // You can specify the condition here if needed
            
            if (!diagnosisData) {
                return res.status(404).json({ error: 'Diagnosis data not found' });
            }

            // Return the AI diagnosis data
            const { AiText, disease, complexityStatus, confidenceScore, daysInRehabilitation } = diagnosisData;
            
            // Send back the diagnosis data in the required format
            res.status(200).json({
                AiText,
                disease,
                complexityStatus,
                confidenceScore,
                daysInRehabilitation
            });
        } catch (error) {
            console.error('Error fetching AI diagnosis data:', error);
            res.status(500).json({ error: 'Failed to fetch AI diagnosis data' });
        }
    });

    return router;
};
