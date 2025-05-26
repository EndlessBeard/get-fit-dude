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

// Function to check if a video is available
function checkVideo(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                const isAvailable = !data.includes('Video unavailable') && 
                                  !data.includes('This video isn\'t available anymore') &&
                                  !data.includes('This video has been removed');
                
                resolve({
                    url,
                    status: res.statusCode,
                    available: isAvailable,
                    videoId: url.split('v=')[1]
                });
            });
        }).on('error', (err) => {
            resolve({
                url,
                status: 'error',
                available: false,
                error: err.message,
                videoId: url.split('v=')[1]
            });
        });
    });
}

// Function to add TODO comments to the file
function addTodoComments(unavailableVideos) {
    let updatedContent = content;
    
    unavailableVideos.forEach(video => {
        const videoUrl = video.url;
        const todoComment = `// TODO: Replace unavailable video (${video.videoId})\n      `;
        const regex = new RegExp(`(\\s*videoUrl:\\s*)'${videoUrl}'`, 'g');
        updatedContent = updatedContent.replace(regex, `\n${todoComment}$1'${videoUrl}'`);
    });
    
    fs.writeFileSync(exerciseFile, updatedContent, 'utf8');
}

// Check all URLs
async function checkAllVideos() {
    console.log(`Found ${urls.length} video URLs to check...\n`);
    
    const results = await Promise.all(urls.map(checkVideo));
    
    // Group results
    const available = results.filter(r => r.available);
    const unavailable = results.filter(r => !r.available);
    
    console.log('Summary:');
    console.log(`✅ ${available.length} videos are available`);
    console.log(`❌ ${unavailable.length} videos need attention\n`);
    
    if (unavailable.length > 0) {
        console.log('Videos that need attention:');
        unavailable.forEach(result => {
            console.log(`❌ Video ID: ${result.videoId}`);
            console.log(`   URL: ${result.url}`);
            if (result.error) {
                console.log(`   Error: ${result.error}\n`);
            } else {
                console.log(`   Status: Video unavailable\n`);
            }
        });

        // Add TODO comments to the file
        addTodoComments(unavailable);
        console.log('\nTODO comments have been added to exercise_notepad.ts');
    }
}

checkAllVideos();
