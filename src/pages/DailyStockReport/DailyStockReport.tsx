import DailyStockTable from "../../components/DailyStockTable/DailyStockTable";
import styles from "./dailyStockReport.module.scss";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const DailyStockReport = () => {
    const [stocks, setStocks] = useState([]);
    const [date, setDate] = useState<string>();

    const {id} = useParams();
    useEffect(() => {
        if(!(date===undefined || date === '' || date === null) && id !== undefined){
            fetch(`http://localhost:3000/report/daily/${id}/${date}`,{credentials: 'include'})
                .then((result) => {
                    return result.json();
                })
                .then((jsonData) => {
                    setStocks(jsonData.data);
                });
        }
    }, [date, id]);
    const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
        setDate(dateString.toString())
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <p>Daily Stock Summary Report</p>
                </div>
                <div className={styles.selectDate}>
                    <DatePicker
                        className={styles.datePicker}
                        onChange={onChange}
                    />
                </div>
                <DailyStockTable data={stocks} />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.printButton}>Print</button>
                <button className={styles.exportButton}>Generate Excel </button>
            </div>
        </div>
    );
};

export default DailyStockReport;
