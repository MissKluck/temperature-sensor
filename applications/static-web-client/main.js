/**
 * 
 * The shape of the weather report from the Web API
 * JSDoc can be used to document --> check Lars repository
 * @link [JSDoc] https://jsdoc.
 * 
 * @typedef {Array<weatherReports>}
 */

async function getLatestReport () {
    // Hent data
    try {
        const response = await fetch("http://localhost:3000/reports")
        /**
         * @type {Array<WeatherReport>}
         */


const weatherReports = await response.json()
const lastWeatherReport = weatherReports[weatherReports.length - 1]

// Bruk dataen til å oppdatere html(dokumentet)
const temperatureElement = document.getElementById("temperature")
temperatureElement.textContent = lastWeatherReport.temperature

const timestampElement = document.getElementById("time")
timestampElement.textContent = lastWeatherReport.reportDate

// Legg til nye elementer i tablet vårt
const tableElement = document.getElementById("table-weather-reports")
// Fjern alle underelementer i html
tableElement.innerHTML = ""

for (const report of weatherReports) {
    const newElement = createNewTableEntry(report)
    tableElement.append(newElement)
}
    } catch (error) {
        console.log("Failed to contact server")
    } 
 }

 getLatestReport()
 setInterval(getLatestReport, 5 * 1000)

 function createNewTableEntry(report) {
    const newRow = document.createElement("tr")

    const timeObject = new Date(report.reportDate)
    const formatedTime = `${timeObject.getHours()}:${timeObject.getMinutes()}:${timeObject.getSeconds()}`

    newRow.innerHTML = `
    <td>kl <span class="timestamp">${formatedTime}</span></td>
    <td><span class="temperature">${report.temperature}</span>°C</td>
    `

    return newRow
 }