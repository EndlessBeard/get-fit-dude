const fs = require('fs');
const https = require('https');
const path = require('path');

const exerciseFile = path.join(__dirname, '..', 'exercise_notepad.ts');

// Read the file content
const content = fs.readFileSync(exerciseFile, 'utf8');

// Extract all YouTube URLs using regex
const urlRegex = /videoUrl:\s*'(https:\/\/www\.youtube\.com\/watch\?v=[^']+)'/g;
const urls = [];
let match;

while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
}

// Function to check if a URL is accessible
function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({
                url,
                status: res.statusCode,
                working: res.statusCode === 200
            });
        }).on('error', () => {
            resolve({
                url,
                status: 'error',
                working: false
            });
        });
    });
}

// Check all URLs
async function checkAllUrls() {
    console.log(`Found ${urls.length} video URLs to check...\n`);
    
    const results = await Promise.all(urls.map(checkUrl));
    
    // Group results by status
    const working = results.filter(r => r.working);
    const notWorking = results.filter(r => !r.working);
    
    console.log('Summary:');
    console.log(`✅ ${working.length} URLs are working`);
    console.log(`❌ ${notWorking.length} URLs need attention\n`);
    
    if (notWorking.length > 0) {
        console.log('URLs that need attention:');
        notWorking.forEach(result => {
            console.log(`❌ ${result.url}`);
            console.log(`   Status: ${result.status}\n`);
        });
    }
}

checkAllUrls();
