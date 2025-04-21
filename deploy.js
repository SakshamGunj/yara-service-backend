#!/usr/bin/env node

const { execSync } = require('child_process');

// Helper function to run commands
function runCommand(command) {
  try {
    console.log(`> ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Failed to execute: ${command}`);
    return false;
  }
}

// Ask for deployment platform
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== Yara Escape Journeys Backend Deployment ===');
console.log('1. Heroku');
console.log('2. Railway (via GitHub)');
console.log('3. Render (via GitHub)');
console.log('4. Generic (prepare for any deployment)');

readline.question('Choose a deployment platform (1-4): ', (choice) => {
  switch(choice) {
    case '1':
      deployToHeroku();
      break;
    case '2':
      deployToRailway();
      break;
    case '3':
      deployToRender();
      break;
    case '4':
      prepareGenericDeployment();
      break;
    default:
      console.log('Invalid choice. Exiting.');
  }
  
  readline.close();
});

function deployToHeroku() {
  console.log('\nDeploying to Heroku...');
  
  if (!runCommand('heroku --version')) {
    console.error('Heroku CLI not found. Please install it first.');
    return;
  }
  
  if (!runCommand('heroku create yara-escape-journeys-api')) {
    console.log('Heroku app creation failed or app already exists.');
  }
  
  console.log('Deploying backend to Heroku...');
  if (runCommand('git subtree push --prefix backend heroku main')) {
    console.log('\n✅ Backend successfully deployed to Heroku!');
    console.log('Your API URL is: https://yara-escape-journeys-api.herokuapp.com/api');
    console.log('Remember to update your frontend environment variable VITE_API_URL');
  } else {
    console.error('❌ Deployment failed. Try deploying manually.');
  }
}

function deployToRailway() {
  console.log('\nTo deploy to Railway:');
  console.log('1. Visit https://railway.app/');
  console.log('2. Connect your GitHub repository');
  console.log('3. Create a new project and select your repository');
  console.log('4. Set the root directory to `/backend`');
  console.log('5. Deploy the service');
  console.log('\nAfter deployment, get your API URL and update your frontend environment variable VITE_API_URL');
}

function deployToRender() {
  console.log('\nTo deploy to Render:');
  console.log('1. Visit https://render.com/');
  console.log('2. Create a new Web Service');
  console.log('3. Connect your GitHub repository');
  console.log('4. Set the root directory to `/backend`');
  console.log('5. Set build command: npm install');
  console.log('6. Set start command: npm start');
  console.log('7. Create the service and deploy');
  console.log('\nAfter deployment, get your API URL and update your frontend environment variable VITE_API_URL');
}

function prepareGenericDeployment() {
  console.log('\nPreparing for deployment...');
  
  // Install dependencies
  if (!runCommand('npm install')) {
    console.error('Failed to install dependencies');
    return;
  }
  
  // Create a deployment package
  console.log('\nCreating deployment package...');
  runCommand('mkdir -p ../deploy/backend');
  runCommand('cp -r ./* ../deploy/backend/');
  runCommand('cp .env* ../deploy/backend/ 2>/dev/null || :');
  
  console.log('\n✅ Deployment package created in the deploy folder');
  console.log('You can now upload this folder to your hosting provider');
}
