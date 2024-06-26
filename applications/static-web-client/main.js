async function getLastestReport () {
    // Hent data
const response = await fetch("http://localhost:3000/reports")
/**
 * 
 * The shape of the weather report from the Web API
 * JSDoc can be used to document --> check Lars repository
 * @link [JSDoc] https://jsdoc.
 * 
 * @typedef {Array<weatherReports>}
 */

const weatherReports = await response.json()
const lastWeatherReport = weatherReports[weatherReports.length - 1]

// Bruk dataen til å oppdatere html(dokumentet)
const temperatureElement = document.getElementById("temperature")
temperatureElement.textContent = lastWeatherReport.temperature

const timestampElement = document.getElementById("time")
timestampElement.textContent = lastWeatherReport.reportDate

// Legg til nye elementer i tablet vårt
console.tableElement = getElementById("table-weather-reports")
// Fjern alle underelementer i html
tableElement.removeChildren // Må finne riktig kode fra Lars' git

for (const report of weatherReports) {
    const newElement = createNewTableEntry(report)
    tableElement.append(newElement)
}


 }

 getLastestReport()
 setInterval(getLastestReport, 5 * 1000)

 function createNewTableEntry(report) {
    const newRow = document.createElement("tr")

    const timeObject = new Date(report.reportDate)
    const formatTime = `${timeObject.getHours()}:${timeObject.getMinutes}:${timeOcject.getSeconds}`

    newRow.innerHTML = `
    <td>kl <span class="timestamp">${report.reportDate}</span></td>
    <td><span class="temperature">${report.temperature}</span>°C</td>
    `

    newRow.append(timeElement, temperatureElement)

    return newRow
 }