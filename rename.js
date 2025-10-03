/*
    Aluvii Signed Waiver Renamer
    Created By: Kardall
    Date: 03/10/2025
    Description: This script rename all .html files in the directory specified, by extracting the Date, First Name, and Last Name from the contents of each file.
    Instructions: Make sure all of the downloaded Waivers from Aluvii are in the same directory as this script. To run, in a terminal, type: node rename.js
        The files will be renamed and moved to a subdirectory called "renamed".
*/

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const sourceDir = 'f:\\aluviiscraper';
const targetDir = path.join(sourceDir, 'renamed');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    // Extract Date Signed using regex
    const dateMatch = html.match(/<label>Date Signed ([\d\/]+)<\/label>/);
    let dateSigned = 'UnknownDate';
    if (dateMatch) {
        // Convert MM/DD/YYYY to YYYY-MM-DD
        const parts = dateMatch[1].split('/');
        if (parts.length === 3) {
            dateSigned = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
        }
    }
    // Remove Export to PDF button and related script
    $('.button-section-export-pdf').remove();
    $('script').each(function() {
        if ($(this).html().includes('export-pdf') || $(this).html().includes('drawDOM')) {
            $(this).remove();
        }
    });
    
    // Extract First Name and Last Name using Cheerio
    const firstName = $('label[for="z0__FirstName"]').parent().contents().filter(function() {
        return this.type === 'text';
    }).text().trim() || 'UnknownFirst';

    const lastName = $('label[for="z0__LastName"]').parent().contents().filter(function() {
        return this.type === 'text';
    }).text().trim() || 'UnknownLast';

    // Add Date Signed element at the top of <body>
    $('body').prepend(`<div style="background:#ffe;border-bottom:1px solid #ccc;padding:10px;font-size:1.2em;"><strong>Date Signed:</strong> ${dateSigned}</div>`);

        function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // Format new filename
    var newFileName = `${dateSigned} - ${firstName} ${lastName}.html`;
    var newFilePath = path.join(targetDir, newFileName);
    if(fs.existsSync(newFilePath)) {
        newFileName = `${dateSigned} - ${firstName} ${lastName} - `+ makeid(4) +`.html`;
        newFilePath = path.join(targetDir, newFileName);
    }

    // Write modified HTML to new file
    fs.writeFileSync(newFilePath, $.html());
    console.log(`Renamed and updated: ${file} -> ${newFileName}`);
});
