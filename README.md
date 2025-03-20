# Stock Market App

A React application that allows users to search for and track stock market data.
## Features

- Search for stocks by ticker symbol
- Display stock data
- Persistent table of searched stocks

## Tech Stack

- Frontend: React with Vite
- Backend: Node.js with Express
- API: Stockdata.org
- Styling: CSS with Bootstrap

## Prerequisites

- Node.js
- npm
- A Stockdata.org API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/basilali/StockMarketApp
cd StockMarketApp
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd api
npm install
```

4. Create a `.env` file in the `api` directory with your API key:
```
STOCK_API_KEY=your_api_key_here
PORT=3001
```

## Running the Application

1. Start the backend server:
```bash
cd api
npm start
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a stock ticker symbol (e.g. AAPL, GOOGL, MSFT)
2. Click "Search" to fetch the stock data
3. The stock will be added to the table if it's new, or updated if it already exists
4. Use the "Refresh All Stocks" button to update all stocks in the table

## API Endpoints

- `GET /api/stock/:ticker` - Fetches stock data for a given ticker symbol

## Environment Variables

- `STOCK_API_KEY`: Your Stockdata.org API key
- `PORT`: Backend server port (default: 3001)


