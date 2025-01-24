import { useState } from 'react'
import './App.css'
import StockTable from "./StockTable.jsx";
import {getStockData} from "./api.js";

/**
 * This component has the ticker input field. It takes the user input, sanitizes it, initiates the API call and sends the data to the table component
 * By: Basil Ali
 *
 * @returns {JSX.Element}
 */
function App() {

    const [query, setQuery] = useState('')
    const [stockData, setStockData] = useState([])

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

                setStockData(extractedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
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
                  placeholder = "Ex: AAPL"
              />
              <button>
                  Search
              </button>
          </form>
          {stockData.length > 0 && <StockTable stockData={stockData} />}
    </>
  )
}

export default App
