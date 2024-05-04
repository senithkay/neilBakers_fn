import React from "react";
import Styles from "./stockTableRow.module.scss";

interface TableRowProps {
    product: React.ReactNode;
    availableStock: number;
    remainingStock: number;
    soldUnits: number;
    pricePerUnit: number;
    totalSales: number;
}

const TableRow: React.FC<TableRowProps> = ({ product, availableStock, remainingStock , soldUnits , pricePerUnit , totalSales }) => {

    return (
        <tr className={Styles.tr}>
            <div className={Styles.td}>
                <td className={Styles.td1}>{product}</td>
                <td className={Styles.td2}>{availableStock}</td>
                <td className={Styles.td3}>{remainingStock}</td>
                <td className={Styles.td4}>{soldUnits}</td>
                <td className={Styles.td5}>{pricePerUnit}</td>
                <td className={Styles.td6}>{totalSales}</td>
            </div>
        </tr>
    );
};

export default TableRow;
