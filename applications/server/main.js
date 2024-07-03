
import { ServerResponse, IncomingMessage, createServer } from 'node:http'
import { appendFile, writeFile, readFile, mkdir } from 'node:fs/promises'

let reportId = 0
const reportsPath = "/app/data/reports.json"

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

// IO (InputOutput) Function
async function appendReport(newReport) {
   
    // Read current stored data
    const currentReportsRaw = await readFile(reportsPath)
    const currentReports = JSON.parse(currentReportsRaw)

    // Create a new data set
    const newReports = [... currentReports, newReport]
    const reportString = JSON.stringify(newReports)
    
    // Write to file
    await writeFile(reportsPath, reportString, { encoding: "utf-8"})

    
}

async function loadReports() {
    const data = await readFile(reportsPath)
    return data
}


/** 
 * @param {IncomingMessage} request
 * @param {ServerResponse<IncomingMessage> & {
 * req: IncomingMessage;
 * }} response
 */

async function getAllReports(request, response) {
    // Convert to network format
    const data = await loadReports()

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
            temperature: obj.temperature,
        }

        appendReport(newReport)
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

setupEnviroment()

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