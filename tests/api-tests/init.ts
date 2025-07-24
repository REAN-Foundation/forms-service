import Application from '../../src/app';
import path from 'path';
import fs from 'fs';
import { before, after } from 'mocha';
import { exit } from 'process';

// Global type declaration
declare global {
    var TestCache: { [key: string]: any };
}

const infra = Application.instance();

/////////////////////////////////////////////////////////////////////////////////

//Set-up
before('Initialize Test Environment', async function() {
    this.timeout(30000); // 30 second timeout for setup
    console.log('Set-up: Initializing test set-up!');
    const start = Date.now();
    
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.PORT = '5556'; // Use a different port for tests
    
    // Initialize test data cache
    initializeCache();
    
    await infra.start();
    console.log('Set-up: infra.start() completed in', Date.now() - start, 'ms');
    console.log('\nTest set-up: Done!\n');
});

//Tear-down
after('Cleanup Test Environment', async function() {
    this.timeout(10000); // 10 second timeout for cleanup
    console.info('Starting test environment cleanup...');
    await wait(1000); // Give time for any pending operations to complete
    console.info('Tear-down: Server shut down successfully!');
    exit(0);
});

/////////////////////////////////////////////////////////////////////////////////

async function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

global.TestCache = {};

export const setTestData = (value: any, key: string) => {
    if (value) {
        global.TestCache[key] = value;
    } else {
        console.log("error unable to set test data");
    }
};

export const getTestData = (key: string): any => {
    const token = global.TestCache[key];
    if (token) {
        return global.TestCache[key];
    } else {
        console.log("Error cannot find test data");
        return null;
    }
};

function loadTestData() {
    var filepath = path.join(process.cwd(), 'tests', 'api-tests', 'test.data', 'test.data.json');
    var fileBuffer = fs.readFileSync(filepath, 'utf8');
    const obj = JSON.parse(fileBuffer);
    return obj;
}

function initializeCache() {
    const testData = loadTestData();
    global.TestCache = { ...testData };
}
