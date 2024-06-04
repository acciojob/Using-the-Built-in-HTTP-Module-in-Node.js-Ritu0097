const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');
const port = 3000;
const mainPath = path.join(__dirname,'..', 'main.js'); // Adjust the path as necessary
 
let serverProcess;
 
beforeAll((done) => {
  // Attempt to close any server that is already running on the test port
  exec(`lsof -i tcp:${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`, (killError) => {
    if (killError) {
      // If there's an error, it likely means no process was found to kill
      console.log(`No server to shut down on port ${port} or could not kill the process.`);
    }
 
    // Start the server as a child process
    serverProcess = exec(`node ${mainPath}`, (error) => {
      if (error) {
        console.error(`Could not start server: ${error}`);
        return done(error);
      }
    });
 
    // Give the server a moment to start
    setTimeout(done, 1000); // Wait 1 second for the server to start
  });
}, 15000); // Extended timeout for starting the server
 
afterAll(() => {
  if (serverProcess) {
    serverProcess.kill();
  }
});
 
test('Server responds with "Hello, World!"', async () => {
  const response = await axios.get(`http://localhost:${port}`);
  expect(response.data).toBe('Hello, World!\n');
});