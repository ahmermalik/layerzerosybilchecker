import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the CSV file
const csvFilePath = path.resolve(__dirname, 'initialList.csv');

// Accounts array
const accounts = ['0xd00nb8effer21277df78h1f285b379bb03d8a9b4', '0xd00nb8effer21277df78h1f285b379bb03d8a9b4']

let headersPrinted = false;

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        if (!headersPrinted) {
            // Print the headers (keys of the first row object)
            console.log('CSV Headers:', Object.keys(row));
            headersPrinted = true;
        }

        const accountFromCSV = row['ADDRESS']?.trim(); // Replace 'ADDRESS' with the actual header of your CSV and trim whitespace
        if (accountFromCSV) {
            if (accounts.includes(accountFromCSV)) {
                console.log(`${accountFromCSV}: true`);
            } else {
                // console.log(`${accountFromCSV}: false`);
            }
        } else {
            // console.log('No address found in row:', row);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    })
    .on('error', (error) => {
        console.error(`Error reading the CSV file: ${error.message}`);
    });
