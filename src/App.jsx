import { useState } from 'react'
import './App.css'

function App() {

    const [query, setQuery] = useState('')

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let sanitizedQuery = sanitizeQuery(query);
        if (!sanitizedQuery) {
            alert("Please enter a valid stock symbol.");
            return;
        }
        console.log(sanitizedQuery);
    }

    const sanitizeQuery = (query) => {
        return query.replace(/[^a-zA-Z]/g, '');
    }

  return (
    <>
      <h1>Stock Market App</h1>
      <div className="card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="stockInput">Enter Stock Symbol:</label>
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
      </div>
    </>
  )
}

export default App
