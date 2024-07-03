
import { ServerResponse, IncomingMessage, createServer } from 'node:http'
import { appendFile, writeFile, readFile, mkdir } from 'node:fs/promises'
import { getAllReports, registerNewMeasurement, reportsPath } from './handlers/reportHandlers.js'


// Lifecycle Initialisation --> What it does when the program starts
async function setupEnviroment() {
     // Create files and directory if they don't exist
     try {
        await readFile(reportsPath)
    } catch (error) {
        // File and/directory does not exist create them
        try {
            await mkdir("./data")
        } catch (error) {
            console.log("Folder existed")
        }
        await writeFile(reportsPath, "[]")
    }
}



// Cross cutting Middleware
/** 
 * @param {IncomingMessage} request
 */

function logger(request) {
    const structuredLog = {
        type: "info",
        path: request.url,
        method: request.method,
        timeStamp: new Date().toISOString(),
    }
    
    console.log(structuredLog)
}

function setCors(response) {
    response.setHeader(
        "Access-Control-Allow-Origin", '*'
    )
}

// Create a new server - Main Program Loop - what your program actually does
const server = createServer((request, response) => {
    // Middleware --> setter opp noe logikk som skal ta og skje før vi sender det videre til de spesifikke handlerene
    logger(request)
    setCors(response)
    
    // Routing logic
        const path = request.url
        const method = request.method

    if (
        path === "/reports" && 
        method === "GET") {
        getAllReports(request, response)

    }    else if (
        path === "/measurements" && 
        method === "POST") {
        registerNewMeasurement(request, response)

    } else {
        response.writeHead(404)
        response.end("Resource not found")
    }  
})



// Configure the server - Lifecycle definition
await setupEnviroment()

// Start the server
server.listen(3000, "0.0.0.0", () => {
    console.log("Server listening on http://localhost:3000")
})

// Lytt etter avslutningsmeldinger --> Lifecycle shutdown
process.addListener("SIGTERM", () => { 
    process.exit() 
})
process.addListener("SIGINT", () => { 
    process.exit() 
})