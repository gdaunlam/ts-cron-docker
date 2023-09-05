var cron = require('node-cron');
const { execSync } = require('child_process');

function runCommand(command) {
    try {
        const output = execSync(command);
        console.log(`result: ${output.toString()}`);
    } catch (error) {
        console.error(`error running ${command}: ${error.message}`);
    }
}

cron.schedule('* * * * *', () => {
    runCommand('cd ../api && npm run start',)
});