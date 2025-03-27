import Papa from 'papaparse'

/**
 * Load and parse a CSV file
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise} Promise resolving to parsed CSV data
 */
export const loadCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        // For local development
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch CSV: ${response.status} ${response.statusText}`
                    )
                }
                return response.text()
            })
            .then((csvText) => {
                const results = Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                })
                resolve(results.data)
            })
            .catch((error) => {
                console.error('Error loading CSV:', error)
                reject(error)
            })
    })
}
