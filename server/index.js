const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

const OLLAMA_API = process.env.VITE_APP_OLLAMA_API;  // Access the environment variable

// Validate environment variable at the start
if (!OLLAMA_API) {
    console.error('OLLAMA_API is not defined in the environment variables.');
    process.exit(1);  // Exit if the environment variable is not set
}

console.log('OLLAMA_API: ', OLLAMA_API);

// API route for generating financial advice based on client answers
app.post('/generate', async (req, res) => {
    const { answers } = req.body;

    // Destructure answers
    const {
        investmentGoal,
        withdrawalTime,
        flexibility,
        age,
        passiveIncome,
        monthlySpendings,
        savings,
    } = answers;

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
    Generate the following financial advice in strict JSON format with no additional text or explanation. The response should contain exactly this structure:

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
        "advice": "Fully explained advice for the client based on their answers in the form of a paragraph.cThe advice should be tailored to the client's investment goal, time horizon, risk level, and other factors and super easy to understand for not experienced user.",
        "riskManagementTips": [
            "Tip 1",
            "Tip 2",
            "Tip 3"
        ],
        "visualizations": {
            "assetAllocationChart": {
                "title": "Asset Allocation Pie Chart",
                "chart": [
                    {"label": "Stocks", "value": "X", "color": "#ColorCode"},
                    {"label": "Bonds", "value": "Y", "color": "#ColorCode"},
                    {"label": "Real Estate", "value": "Z", "color": "#ColorCode"}
                ]
            },
            "expectedReturnChart": {
                "title": "Expected Return Line Graph",
                "chart": [
                    {"year": "Year", "return": "X%"},
                    {"year": "Year", "return": "Y%"}
                ]
            }
        },
        "additionalAdvice": {
            "educationSavings": {
                "goalAmount": "$Amount",
                "monthlyContribution": "$Amount"
            },
            "incomeInvesting": {
                "monthlyInvestment": "$Amount",
                "investmentVehicle": "Investment Type"
            }
        }
    }

    Ensure that the response is *only* this JSON, without any introduction or extra explanations. If there is any extraneous text or markdown, it should be excluded.
`;


    try {
        const response = await axios.post(OLLAMA_API, {
            model: "ALIENTELLIGENCE/virtualfinancialadvisors:latest",
            prompt: financialAdvicePrompt,
            stream: false,
        });

        // Extract the financial advice from response.data.response
        let financialAdvice = response.data.response.trim();
        const advice = JSON.parse(financialAdvice);
        
        console.log(advice);
        res.json({ advice });
    } catch (error) {
        console.error("Ollama API Error:", error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to generate financial advice",
            details: error.response?.data || error.message,
        });
    }
});

// Starting the server
app.listen(5000, () => console.log("Backend running on port 5000"));
