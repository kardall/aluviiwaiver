/*
    Aluvii Signed Waiver Scraper
    Created By: Kardall
    Date: 03/10/2025
    Description: This script will download the HTML file of all of the signed waivers from the Aluvii system based on your company's URL.
    Instructions: On your signed waiver page, enter the first and last ID of the waivers in the min and max values below.
        The batchSize is set so it doesn't overload the server with requests.
        After it is completed, run the rename.js script to rename the files based on the contents with Date, First Name and Last Name.
        Then use a Batch PDF Converter to convert the HTML files to PDF files for storage.
*/

var min = 1; // The minimum ID of the waiver to download
var max = 7847; // The maximum ID of the waiver to download
var batchSize = 10; // Number of requests to make at a time

const fs = require("fs");
const request = require("request-promise-native");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded site file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

async function runBatches() {
    for (let i = min; i <= max; i += batchSize) {
        let batch = [];
        for (let j = i; j < i + batchSize && j <= max; j++) {
            batch.push(downloadPDF(
                "https://<yourstore>.aluvii.com/Employee/Waiver/ViewSignedWaiverWithMultipleGuest?SignedWaiverId=" + j,
                "Waiver_" + j + ".html"
            ));
        }
        await Promise.all(batch);
        await delay(2000); // Wait 3 seconds between batches
    }
}

runBatches();
