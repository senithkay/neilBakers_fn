import styles from "./dashboard.module.scss";
import ProfilePic from "../../assets/Images/ProfilePIc.png";
import { Doughnut, Line } from "react-chartjs-2";
import {  defaults } from "chart.js/auto";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendGET} from "../../utils/apiHelper.ts";
import {Calendar, CalendarProps, theme} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {GET_DASHBOARD_DAILY_SALES, GET_DASHBOARD_MONTHLY_STOCK, GET_TEMP_USER} from "../../utils/apiRoute.ts";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Dashboard = () => {
    const [days, setDays] = useState(['']);
    const [values, setValues] = useState([]);
    const [soldQty, setSoldQty] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [user, setUser] = useState<any>({});
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const {id} = useParams();

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const handleCalendarSelect = (value: Dayjs) => {
        handleDateChange(value);
    };
    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 400,
        height: 400,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    useEffect(()=>{
       if (id !== undefined&& id.length>0){
           const params1 = [{key: 'id', value: id}];
           sendGET(GET_DASHBOARD_MONTHLY_STOCK, params1).then((jsonData) => {
                   setDays(jsonData.data.days);
                   setValues(jsonData.data.values);
               });
           const params2 = [{key: 'id', value: id}, {key: 'date', value: selectedDate.format('YYYY-MM-DD')}];
           sendGET(GET_DASHBOARD_DAILY_SALES, params2).then((jsonData) => {
               if (jsonData.data.sold === 0 && jsonData.data.total === 0 ){
                   setSoldQty(0)
                   setTotalQty(100)
               }
               else{
                   setSoldQty(jsonData.data.sold)
                   setTotalQty(jsonData.data.total)
               }
               });

           sendGET(GET_TEMP_USER, [])
               .then((jsonData) => {
                   setUser(jsonData.data);
               });
       }
    },[id,selectedDate]);
    return (
        <div className={styles.wrappper}>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <img className={styles.profilePic} src={ProfilePic} />
                    <div className={styles.text}>
                        <p className={styles.role}>{user.isSuperAdmin?'Super Admin': 'Admin'}</p>
                        <p className={styles.roleName}>- {user.username}</p>
                    </div>
                    <div className={styles.links}>
                        <button>Feed</button>
                        <button>Activity</button>
                        <button>Profile</button>
                    </div>
                </div>
                <div className={styles.middleContainer}>
                    <div className={styles.chart1}>
                        <Line
                            data={{
                                labels: days,
                                datasets: [
                                    {
                                        label: "Sales",
                                        data: values,
                                    },
                                ],
                            }}
                            height={400}
                            width={600}
                        />
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    <div style={wrapperStyle} className={styles.cal}>
                        <Calendar
                            fullscreen={false}
                            onSelect={handleCalendarSelect}
                            onPanelChange={onPanelChange}
                        />
                    </div>
                    <div className={styles.chart2}>
                        <Doughnut
                            data={{
                                labels: ["Sold", "Remaining"],
                                datasets: [
                                    {
                                        label: "Stock",
                                        data: [soldQty, totalQty - soldQty],
                                    },
                                ],
                            }}
                            height={400}
                            width={600}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
