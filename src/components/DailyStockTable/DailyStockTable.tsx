import React from "react";
import styles from './dailyStockTable.module.scss';

interface DailyStockItem {
    productName: string;
    openingStock: number;
    soldStock: number;
    balanceStock: number;
    pricePerUnit: number;
    totalSales: number;
}

interface Props {
    data: DailyStockItem[];
}

const DailyStockTable: React.FC<Props> = ({ data }) => {
    const totalSales = data.reduce((acc, item) => acc + item.totalSales, 0);
    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Product Name</th>
                        <th>Opening Stock Qty</th>
                        <th>Sold Stock Qty</th>
                        <th>Balance Qty</th>
                        <th>Price per Unit</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.openingStock}</td>
                            <td>{item.soldStock}</td>
                            <td>{item.balanceStock}</td>
                            <td>{item.pricePerUnit}</td>
                            <td>{item.totalSales}</td>
                        </tr>
                    ))}
                    {/* Display 10 empty rows */}
                    {Array.from({ length: 10 - data.length }).map((_, index) => (
                        <tr key={index + data.length}>
                            <td>{index + data.length + 1}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6}>Total</td>
                        <td>{totalSales}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default DailyStockTable;
