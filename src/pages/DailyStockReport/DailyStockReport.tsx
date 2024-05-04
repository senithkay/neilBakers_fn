import DailyStockTable from "../../components/DailyStockTable/DailyStockTable";
import styles from "./dailyStockReport.module.scss";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendGET} from "../../utils/apiHelper.ts";
import {GET_DAILY_REPORT} from "../../utils/apiRoute.ts";

const DailyStockReport = () => {
    const [stocks, setStocks] = useState([]);
    const [date, setDate] = useState<string>();

    const {id} = useParams();
    useEffect(() => {
        if(!(date===undefined || date === '' || date === null) && id !== undefined){
            const params = [{key: 'id', value: id}, {key: 'date', value: date}];
            sendGET(GET_DAILY_REPORT, params)
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
