import { useState } from 'react'
import './App.css'
import StockTable from "./StockTable.jsx";
import {getStockData} from "./api.js";

/**
 * This component has the ticker input field. It takes the user input, sanitizes it, initiates the API call and sends the data to the table component
 */
function App() {
    const [query, setQuery] = useState('')
    const [stockData, setStockData] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let sanitizedQuery = sanitizeQuery(query);
        if (!sanitizedQuery) {
            alert("Please enter a valid stock ticker.");
            return;
        }
        console.log(sanitizedQuery);
        setQuery("");

        const fetchData = async () => {
            try {
                const data = await getStockData(sanitizedQuery);
                if (data.meta.returned === 0) {
                    alert("Invalid stock ticker.");
                    return;
                }
                const extractedData = data.data.map(stock => ({
                    name: stock.name,
                    ticker: stock.ticker,
                    price: stock.price,
                    day_change: stock.day_change,
                    day_high: stock.day_high,
                    day_low: stock.day_low,
                    day_open: stock.day_open,
                }));

                setStockData(prevStocks => {
                    const existingStockIndex = prevStocks.findIndex(s => s.ticker === extractedData[0].ticker);
                    if (existingStockIndex !== -1) {
                        const updatedStocks = [...prevStocks];
                        updatedStocks[existingStockIndex] = extractedData[0];
                        return updatedStocks;
                    } else {
                        return [...prevStocks, extractedData[0]];
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }

    const handleRefresh = async () => {
        if (stockData.length === 0) return;
        
        setIsRefreshing(true);
        try {
            const refreshPromises = stockData.map(stock => getStockData(stock.ticker));
            const results = await Promise.all(refreshPromises);
            
            const updatedStocks = results.flatMap(result => 
                result.data.map(stock => ({
                    name: stock.name,
                    ticker: stock.ticker,
                    price: stock.price,
                    day_change: stock.day_change,
                    day_high: stock.day_high,
                    day_low: stock.day_low,
                    day_open: stock.day_open,
                }))
            );
            
            setStockData(updatedStocks);
        } catch (error) {
            console.error('Error refreshing stocks:', error);
        } finally {
            setIsRefreshing(false);
        }
    }

    const sanitizeQuery = (query) => {
        return query.replace(/[^a-zA-Z]/g, '');
    }

    return (
        <>
            <h1>Stock Search</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="stockInput">Enter Stock Ticker:</label>
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Ex: AAPL"
                />
                <button>
                    Search
                </button>
            </form>
            {stockData.length > 0 && (
                <>
                    <button 
                        onClick={handleRefresh} 
                        disabled={isRefreshing}
                        className="refresh-button"
                    >
                        {isRefreshing ? 'Refreshing...' : 'Refresh All Stocks'}
                    </button>
                    <StockTable stockData={stockData} />
                </>
            )}
        </>
    )
}

export default App
