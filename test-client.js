// Node.js test client for FLUX.2-klein-4B Railway API
// Run with: node test-client.js

const fs = require('fs');
const path = require('path');

// Configuration - update with your Railway app URL
const RAILWAY_URL = 'https://your-app.railway.app';

async function generateImage(prompt, outputPath = 'generated-image.png') {
    try {
        console.log(`Generating image with prompt: "${prompt}"`);
        console.log(`API URL: ${RAILWAY_URL}/gen`);
        
        const response = await fetch(`${RAILWAY_URL}/gen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const buffer = await response.arrayBuffer();
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        
        console.log(`✅ Image generated successfully: ${outputPath}`);
        console.log(`📏 File size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
        
        return outputPath;
    } catch (error) {
        console.error('❌ Error generating image:', error.message);
        throw error;
    }
}

// Test prompts
const testPrompts = [
    'life sim scene',
    'cyberpunk city at night',
    'peaceful mountain landscape',
    'cute robot reading a book'
];

async function runTests() {
    console.log('🚀 Testing FLUX.2-klein-4B Railway API\n');
    
    // Test each prompt
    for (let i = 0; i < testPrompts.length; i++) {
        const prompt = testPrompts[i];
        const filename = `test-${i + 1}-${prompt.replace(/\s+/g, '-').toLowerCase()}.png`;
        
        try {
            await generateImage(prompt, filename);
            console.log(`   ✅ Test ${i + 1} passed\n`);
        } catch (error) {
            console.log(`   ❌ Test ${i + 1} failed: ${error.message}\n`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('🏁 Testing complete!');
}

// Interactive mode
async function interactiveMode() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
    
    console.log('🎨 Interactive FLUX.2-klein-4B Generator\n');
    
    while (true) {
        const prompt = await question('Enter prompt (or "quit" to exit): ');
        
        if (prompt.toLowerCase() === 'quit') {
            rl.close();
            break;
        }
        
        if (!prompt.trim()) {
            console.log('❌ Please enter a valid prompt\n');
            continue;
        }
        
        const filename = `interactive-${Date.now()}.png`;
        
        try {
            await generateImage(prompt, filename);
            console.log(`📁 Saved as: ${filename}\n`);
        } catch (error) {
            console.log(`❌ Error: ${error.message}\n`);
        }
    }
}

// Command line interface
function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--test')) {
        runTests();
    } else if (args.includes('--interactive')) {
        interactiveMode();
    } else if (args.length > 0) {
        // Direct prompt usage: node test-client.js "your prompt here"
        const prompt = args.join(' ');
        generateImage(prompt);
    } else {
        console.log('📖 Usage:');
        console.log('  node test-client.js "your prompt here"     # Generate single image');
        console.log('  node test-client.js --test                # Run test suite');
        console.log('  node test-client.js --interactive          # Interactive mode');
        console.log('\n⚙️  Update RAILWAY_URL in the script before running');
    }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
    console.error('❌ This script requires Node.js 18+ with fetch support');
    console.log('   Alternatively, install node-fetch: npm install node-fetch');
    process.exit(1);
}

main();
