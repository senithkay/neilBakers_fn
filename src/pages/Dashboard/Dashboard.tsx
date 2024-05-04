import styles from "./dashboard.module.scss";
import ProfilePic from "../../assets/Images/ProfilePIc.png";
import { Doughnut, Line } from "react-chartjs-2";
import {  defaults } from "chart.js/auto";
import BasicDateCalendar from "../../components/Calender/Calender";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Dashboard = () => {
    const [days, setDays] = useState(['']);
    const [values, setValues] = useState([]);
    const [soldQty, setSoldQty] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [user, setUser] = useState<any>({});

    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
       if (id !== undefined&& id.length>0){
           fetch(`http://localhost:3000/dashboard/monthly-stock/${id}`, {credentials: 'include'})
               .then((result) => {
                   return result.json();
               })
               .then((jsonData) => {
                   setDays(jsonData.data.days);
                   setValues(jsonData.data.values);
               });

           //ToDo change this after fixing date picker
           fetch(`http://localhost:3000/dashboard/daily-sales/${id}/2024-05-10`,{credentials: 'include'})
               .then((result) => {
                   return result.json();
               })
               .then((jsonData) => {
                   setSoldQty(jsonData.data.sold)
                   setTotalQty(jsonData.data.total)
               });

           fetch("http://localhost:3000/temporary/user", {credentials: 'include'})
               .then((result) => {
                   if (result.status === 401){
                       navigate('/signin')
                   }
                   return result.json();
               })
               .then((jsonData) => {
                   setUser(jsonData.data);
               });
       }
    },[id])
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
                    <div className={styles.calender}>
                        <BasicDateCalendar />
                    </div>
                    <div className={styles.chart2}>
                        <Doughnut
                            data={{
                                labels: ["Sold", "Remaining"],
                                datasets: [
                                    {
                                        label: "Stock",
                                        data: [soldQty, totalQty-soldQty],
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
