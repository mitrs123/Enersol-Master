// Importing libraries
import lodash from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle form submission
app.post('/form-data', async (req, res) => {
  debounce_fun(req, res);
});

// Using lodash.debounce() method with its parameters
let debounce_fun = lodash.debounce(async function (req, res) {
  const formData = req.body;

  const url = 'https://enersol-solutions-sheet-automation.vercel.app/form-data';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  };

  try {
    console.log("Endpoint called");
    console.log(formData);

    const response = await fetch(url, options);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let responseData;
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    res.status(200).send(responseData);
  } catch (error) {
    console.error('Error processing form data:', error);
    res.status(500).send('Error processing form data');
  }
}, 5000);

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
