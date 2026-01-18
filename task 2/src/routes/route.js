const express = require('express')
const axios = require('axios')
const router = express.Router()

// router.get('/weather', async function (req, res) {
//     try {
//         let { city } = req.query

//         if (!city) {
//             return res.status(400).send({ status: false, message: "City is required" })
//         }

//         let API_KEY = `de62a064f09c5aa7794ef3ddf2ed71b5`
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

//         let detail = await axios.get(url)
//         return res.status(200).send({ status: true, message: "Weather Details", data: detail.data })
//     } catch (error) {
//         return res.status(500).send({ status: false, message: error.message })
//     }
// })

const weatherCache = new Map()
const CACHE_TTL = 60 * 1000

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchWithRetry = async (url, retries = 2, delayMs = 1000) => {
    try {
        return await axios.get(url)
    } catch (error) {
        if (retries === 0) {
            throw error
        }
        console.error(`Retrying API call... attempts left: ${retries}`)
        await delay(delayMs)
        return fetchWithRetry(url, retries - 1, delayMs * 2)
    }
}

router.get('/weather', async (req, res) => {
    try {
        const { city } = req.query

        if (!city) {
            return res.status(400).send({ status: false, message: "City is required" })
        }

        const cacheKey = city.toLowerCase()
        const cached = weatherCache.get(cacheKey)

        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            return res.status(200).send(cached.data)
        }

        const API_KEY = `de62a064f09c5aa7794ef3ddf2ed71b5`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

        const response = await fetchWithRetry(url)

        const tempCelsius = +(response.data.main.temp - 273.15).toFixed(2)

        const result = {
            city: response.data.name,
            temp: tempCelsius,
            conditions: response.data.weather[0].main
        }

        weatherCache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        })

        return res.status(200).send(result)

    } catch (error) {
        console.error("Weather API Error:", {
            message: error.message,
            status: error.response?.status
        })

        return res.status(error.response?.status || 500).send({
            error: "ERROR",
            message: error.response?.data?.message || "Failed to fetch weather data"
        })
    }
})

module.exports = router