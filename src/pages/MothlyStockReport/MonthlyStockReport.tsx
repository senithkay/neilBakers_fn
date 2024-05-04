import styles from "./monthlyStockReport.module.scss";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import MonthlyStockTable from "../../components/MonthlyStockTable/MonthlyStockTable";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendGET} from "../../utils/apiHelper.ts";
import {GET_DASHBOARD_MONTHLY_REPORT} from "../../utils/apiRoute.ts";

const MonthlystockReport = () => {
    const [stocks, setStocks] = useState([]);
    const [date, setDate] = useState<string>();

    const {id} = useParams();
    useEffect(() => {
        if(!(date===undefined || date === '' || date === null)){
            const params = [{key: 'id', value: id}, {key: 'date', value: date}];
            sendGET(GET_DASHBOARD_MONTHLY_REPORT, params).then((jsonData) => {
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
                    <p>Monthly Stock Summary Report</p>
                </div>
                <div className={styles.selectDate}>
                    <DatePicker
                        className={styles.datePicker}
                        onChange={onChange}
                        picker="month"
                    />
                </div>
                <MonthlyStockTable data={stocks} />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.printButton}>Print</button>
                <button className={styles.exportButton}>Generate Excel </button>
            </div>
        </div>
    );
};

export default MonthlystockReport;
