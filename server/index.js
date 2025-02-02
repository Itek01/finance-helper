const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

const OLLAMA_API = process.env.VITE_APP_OLLAMA_API;  // Access the environment variable
console.log('OLLAMA_API: ', OLLAMA_API);

// API route for generating financial advice based on client answers
app.post('/generateFinancialAdvice', async (req, res) => {
    const { answers } = req.body;

    // Destructure answers
    const { investmentGoal, withdrawalTime, flexibility } = answers;

    // Map flexibility to risk level
    const riskLevelMap = {
        high_level: 'High-risk (aggressive)',
        medium_risk: 'Medium-risk (balanced)',
        low_risk: 'Low-risk (conservative)',
    };
    const riskLevel = riskLevelMap[flexibility] || 'Medium-risk (balanced)';

    // Map withdrawal time to time horizon
    const timeHorizonMap = {
        '0_3_years': 'Short-term (less than 5 years)',
        '4_7_years': 'Medium-term (5-10 years)',
        '7_10_years': 'Long-term (more than 10 years)',
        '10_plus_years': 'Long-term (more than 10 years)',
    };
    const timeHorizon = timeHorizonMap[withdrawalTime] || 'Medium-term (5-10 years)';

    // Construct the prompt
    const financialAdvicePrompt = `
        Generate personalized financial advice based on the following client answers:
        - Investment Goal: ${investmentGoal}
        - Time Horizon: ${timeHorizon}
        - Risk Tolerance: ${riskLevel}

        Provide detailed advice including:
        1. Recommended investment strategies.
        2. Asset allocation (e.g., stocks, bonds, real estate).
        3. Risk management tips.
        4. Expected returns based on historical data.
        5. Visualizations (e.g., pie charts for asset allocation).

        Format the response as a JSON object with the following structure:
        {
            "investmentStrategies": [
                {
                    "strategy": "Strategy Name",
                    "description": "Brief description of the strategy",
                    "assetAllocation": {
                        "stocks": "X%",
                        "bonds": "Y%",
                        "realEstate": "Z%"
                    },
                    "riskLevel": "Low/Medium/High",
                    "expectedReturn": "X% annually"
                }
            ],
            "riskManagementTips": [
                "Tip 1",
                "Tip 2",
                "Tip 3"
            ],
            "visualizations": {
                "assetAllocationChart": "Description of the pie chart for asset allocation",
                "expectedReturnChart": "Description of the line graph for expected returns"
            }
        }
    `;

    try {
        console.log("financialAdvicePrompt: ", financialAdvicePrompt);
        const response = await axios.post(OLLAMA_API, {
            model: "ALIENTELLIGENCE/financialadvisor",
            prompt: financialAdvicePrompt,
            stream: false,
        });

        // Extract the financial advice from response.data.response
        const financialAdvice = response.data.response;

        // Parse the response into a JSON object
        const advice = JSON.parse(financialAdvice);

        res.json({ advice });
    } catch (error) {
        console.error("Ollama API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate financial advice", details: error.message });
    }
});

// Starting the server
app.listen(5000, () => console.log("Backend running on port 5000"));