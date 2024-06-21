async function getLastestReport () {
    // Hent data
const response = await fetch("http://localhost:3000/reports")
/**
 * 
 * The shape of the weather report from the Web API
 * JSDoc can be used to document --> check Lars repository
 * @link [JSDoc] https://jsdoc.
 * 
 * @typedef {Array<{
 * sensorId: number,
 * measurementDate: string,
 * temperature: number }>}
 */

const weatherReports = await response.json()
const lastWeatherReport = weatherReports[weatherReports.length - 1]

console.log(lastWeatherReport)


// Bruk dataen til å oppdatere html(dokumentet)
const temperatureElement = document.getElementById("temperature")
temperatureElement.textContent = lastWeatherReport.temperature

const timestampElement = document.getElementById("time")
timestampElement.textContent = lastWeatherReport.reportDate


setInterval(getLastestReport, 5 * 1000)
 }