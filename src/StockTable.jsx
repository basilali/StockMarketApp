/**
 * This is the table component. It populates the data received and populates the table
 * By: Basil Ali
 *
 * @param stockData The stock data
 * @returns {JSX.Element}
 */
function StockTable({stockData}) {

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
                    <tr key={stock}>
                        <td>{stock.ticker}</td>
                        <td>{stock.name}</td>
                        <td>${stock.price}</td>
                        <td>${stock.day_open}</td>
                        <td>${stock.day_high}</td>
                        <td>${stock.day_low}</td>
                        <td>{stock.day_change}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default StockTable;