'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Health
app.get('/health', (req, res) => {
    console.log("Retrieving health information...")
    res.send('Server is healthy.\n');
});


// GET
app.get('/api/application/:appid', (req, res) => {
    var app_id = req.params.appid;
    var app;

    try {
        // Read from database
        console.log(`Fetching application id:${app_id} from database.`);

        // Code to query database here
        //
        // Sample data returned from database
        app = JSON.stringify({
            app_id: `${app_id}`,
            applicant_name: "John Smith",
            applicant_ssn: "123-345-2981",
            address: "123 Main St, Washington DC 10002"
        });

        console.log(`Application with id: ${app_id} retrieved successfully from database:
        ${app}`);

    } catch (error) {
        console.log(`Error while fetching application id:${app_id} from database.`);
    }
    res.json(app)
    res.status(200).end();
});

// POST
app.use(express.json());
app.post('/api/application', (req, res) => {

    var body;

    try {
        // Update database record for application
        body = JSON.stringify(req.body);
        console.log("Updating application...");
        console.log(`Body: ${body}`);

        // Code to update record in database here
        //

    } catch (error) {
        console.log(`Error while updating application. Body: ${body}`)
    }

    res.json(body);
    res.status(200).end();
});


app.listen(PORT, HOST);
console.log(`Starting application... Running on http://${HOST}:${PORT}`);