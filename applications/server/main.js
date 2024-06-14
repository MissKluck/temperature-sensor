
import { createServer } from 'node:http'


function getAllReports(request, response) {
    response.end("Here are all the reports\n")
}

function registerNewMeasurement(request, response) {
    response.end("Report registered\n") 
}

function logger(request) {
    const structuredLog = {
        type: "info",
        path: request.url,
        timeStamp: new Date().toISOString(),
    }
    
    console.log(structuredLog)
}

// Create a new server
const server = createServer((request, response) => {
// Middleware --> setter opp noe logikk som skal ta og skje før vi sender det videre til de spesifikke handlerene
logger(request)

    const path = request.url

// Routing logic
switch (path) {
    case "/reports":
        getAllReports(request, response)
        break;

    case "/measurements":
        registerNewMeasurement(request, response)
        break;
    default:
        response.end("Resource not found")
        break
}
    
})

// Start the server
server.listen(3000, "localhost", () => {
    console.log("Server listening on http://localhost:3000")
})