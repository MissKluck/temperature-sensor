
import { ServerResponse, IncomingMessage, createServer } from 'node:http'

const reports = []
    let reportId = 0


/** 
 * @param {IncomingMessage} request
 * @param {ServerResponse<IncomingMessage> & {
 * req: IncomingMessage;
 * }} response
 */

function getAllReports(request, response) {
    // Convert to network format
    const data = JSON.stringify(report)

    // Send the resulting package
   
    response.end(data)
}

function registerNewMeasurement(request, response) {
    let data = ""

    request.on("data", (chunk) => {data = data + chunk})

    request.on("end", () => {

        const obj = JSON.parse(data)
        const newReport = {
            reportId: reportId++,
            reportDate: new Date().toISOString(),
            temperature: obj
        }

        reports.push(newReport)

        response.end("Report registered\n") 
    })

   
}

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

// Create a new server
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

// Start the server
server.listen(3000, "0.0.0.0", () => {
    console.log("Server listening on http://localhost:3000")
})

// Lytt etter avslutningsmeldinger
process.addListener("SIGTERM", () => { 
    process.exit() 
})
process.addListener("SIGINT", () => { 
    process.exit() 
})