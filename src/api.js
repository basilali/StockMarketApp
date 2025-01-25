
import {key} from "./key.js";

/**
 * This makes the API call to get the stock data.
 * Normally the API call would be made in the backend
 * By: Basil Ali
 */

export const getStockData =  async (ticker) => {
    const response = await fetch(`https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${key}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
    }
    return response.json();
}