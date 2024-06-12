import { createServer } from 'node:http'

// Create a new server
const server = createServer((request, response) => {
    response.end("Hello World~\n")
})

// Start the server
server.listen(3000, "localhost", () => {
    console.log("Server listening on http://localhost:3000")
})