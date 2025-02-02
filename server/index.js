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
    Make sure of one specific thing. It's one stock object per stock. So any advice, strategies or anything else is one per stock advised. 
    So, give me 3 stocks you think are the best for the current situation, and then fill the json stock object with the most appropriate answer.
this is the user's exact information in this way:
        investmentGoal,
        withdrawalTime,
        flexibility,
        age,
        passiveIncome,
        monthlySpendings,
        savings 
        here is the user's answer: ${answers}

        instructions are done, here is the JSON to follow STRICTLY with no fault:

    {
    "stock": {
            "stock1": {"name": Name of the stock, "reason": explanation for investing, "amount: X% }
            "stock1": {"name": Name of the stock, "reason": explanation for investing, "amount: X%"}
            "stock1": {"name": Name of the stock, "reason": explanation for investing, "amount: X%"}
        }
        "investmentStrategies": [
            {
                "strategy": "Strategy Name",
                "description": "Brief description of the strategy",
                "riskLevel": "Low/Medium/High",
                "expectedReturn": "X% annually"
            }
        ],
        "advice": "Fully explained advice for the client based on their answers in the form of a paragraph.cThe advice should be tailored to the client's investment goal, time horizon, risk level, and other factors and super easy to understand for not experienced user. One per stock.",
        "riskManagementTips": [
            "Tip 1",
            "Tip 2",
            "Tip 3"
        ],
            "expectedReturnChart": 
                { "return1": {"year": "$amount of years", "initialMoney": "X%", "calculatedInterest": "M"}},
                { "return1": {"year": "$amount of years", "initialMoney": "X%", "calculatedInterest": "M"}}
                { "return1": {"year": "$amount of years", "initialMoney": "X%", "calculatedInterest": "M"}}   
            }
        }
    }

    for expected return chart make sure that it's 3 times, once per stock, if you're missing data
    , invent some that are realistic but make sure this is all filled for the 3 stocks

        for stock you can give a list of stocks of any length
here is a list of popular stocks from today, so if you need to use data of these, use this list.
(1	NVDA
NVDA
NVIDIA Corporation
120.03	-4.62	-3.71%	338.496M	238.753M	2.94T	--		

2	
R
RGTI
Rigetti Computing, Inc.
13.18	+0.88	+7.15%	199.173M	140.465M	3.691B	-4.58		

3	INTC
INTC
Intel Corporation
19.45	-0.56	-2.80%	104.672M	73.605M	83.888B	-6.63		

4	
W
WBA
Walgreens Boots Alliance, Inc.
10.28	-1.18	-10.30%	91.238M	25.68M	8.888B	-0.90		

5	F
F
Ford Motor Company
10.08	-0.08	-0.79%	91.036M	60.035M	40.061B	+12.64		

6	TSLA
TSLA
Tesla, Inc.
404.69	+4.41	+1.10%	78.395M	90.802M	1.299T	+90.54		

7	
L
LCID
Lucid Group, Inc.
2.76	+0.04	+1.47%	77.038M	88.54M	8.312B	-1.63		

8	AAPL
AAPL
Apple Inc.
235.96	-1.62	-0.68%	74.629M	50.074M	3.567T	+37.03		

9	
P
PLTR
Palantir Technologies Inc.
82.49	+1.27	+1.56%	73.931M	83.917M	187.914B	+303.75		

10	
B
BBD
Banco Bradesco S.A.
2.11	0.00	0.00%	55.888M	38.913M	22.421B	+9.85		

11	SOFI
SOFI
SoFi Technologies, Inc.
15.79	-0.65	-3.95%	45.88M	48.675M	17.135B	+113.94		

12	JBLU
JBLU
JetBlue Airways Corporation
6.58	+0.26	+4.11%	45.248M	20.887M	2.282B	-2.78		

13	
N
NU
Nu Holdings Ltd.
13.24	-0.20	-1.49%	45.11M	40.64M	63.639B	+42.91		

14	
V
VALE
Vale S.A.
9.29	-0.10	-1.06%	40.663M	32.544M	39.656B	+5.07		

15	
S
SOUN
SoundHound AI, Inc.
14.16	+0.16	+1.14%	39.891M	74.49M	5.236B	-17.32		

16	
P
PFE
Pfizer Inc.
26.52	-0.39	-1.45%	37.269M	43.382M	150.289B	+35.71		

17	
P
PSLV
Sprott Physical Silver Trust
10.51	-0.07	-0.66%	36.98M	13.643M	5.387B	--		

18	
I
IP
International Paper Company
55.63	-1.42	-2.49%	36.748M	4.98M	19.326B	+47.60		

19	
S
SMCI
Super Micro Computer, Inc.
28.52	-0.12	-0.42%	36.338M	71.157M	16.7B	+10.12		

20	
R
RIOT
Riot Platforms, Inc.
11.88	-0.02	-0.17%	36.331M	36.114M	3.948B	+250.11		

21	
N
NIO
NIO Inc.
4.32	-0.12	-2.70%	35.596M	48.814M	9.223B	--		

22	AMD
AMD
Advanced Micro Devices, Inc.
116.06	-2.80	-2.36%	35.511M	36.1M	188.343B	+123.47		

23	
I
IQ
iQIYI, Inc.
2.17	-0.15	-6.47%	35.499M	20.418M	2.082B	--		

24	
B
BABA
Alibaba Group Holding Limited
98.84	-3.90	-3.80%	34.54M	16.591M	236.002B	--		

25	
C
CMCSA
Comcast Corporation
33.66	+0.41	+1.23%	32.095M	21.901M	128.801B	+11.86)		


    Ensure that the response is *only* this JSON, without any introduction or extra explanations. If there is any extraneous text or markdown, it should be excluded.
    also, when you give advice, give an advice for each different stock.
`;

    if (!answers) {
        return res.status(400).json({ error: "No answers provided" });
    }
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
