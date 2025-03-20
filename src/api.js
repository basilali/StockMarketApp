/**
 * This makes the API call to get the stock data from the backend server
 */
export const getStockData = async (ticker) => {
    const response = await fetch(`http://localhost:3001/api/stock/${ticker}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
    }
    return response.json();
}