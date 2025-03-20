/**
 * This is the table component. It displays the data received from the API call
 */
function StockTable({stockData}) {
    const getDayChangeColor = (change) => {
        const value = parseFloat(change);
        if (value > 0) return 'text-success';
        if (value < 0) return 'text-danger';
        return '';
    };

    return (
        <>
            <table className="table table-responsive">
                <thead>
                    <tr className=".table-group-divider">
                        <th>Ticker</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Day Open</th>
                        <th>Day High</th>
                        <th>Day Low</th>
                        <th>Day Change</th>
                    </tr>
                </thead>
                <tbody>
                {stockData.map((stock) => (
                    <tr key={stock.ticker}>
                        <td>{stock.ticker}</td>
                        <td>{stock.name}</td>
                        <td>${stock.price}</td>
                        <td>${stock.day_open}</td>
                        <td>${stock.day_high}</td>
                        <td>${stock.day_low}</td>
                        <td className={getDayChangeColor(stock.day_change)}>
                            {stock.day_change > 0 ? '+' : ''}{stock.day_change}%
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default StockTable;