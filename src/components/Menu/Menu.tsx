import React, {useEffect, useState} from "react";
import styles from "./menu.module.scss";
import Logo from "../../assets/Logo/logo.png";
import DashboardIcon from "../../assets/Icons/Category.svg";
import ReportsIcon from "../../assets/Icons/Filter.svg";
import ProductIcon from "../../assets/Icons/Wallet.svg";
import StockIcon from "../../assets/Icons/stock.png";
import UserIcon from "../../assets/Icons/user.svg";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Menu: React.FC = () => {
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState('');

    useEffect(() => {
        fetch("http://localhost:3000/branch/", {credentials: 'include'})
            .then((result) => {
                return result.json();
            })
            .then((jsonData) => {
                setLocations(jsonData.data);
                const firstLocation = jsonData.data[0];
                setCurrentLocation(firstLocation._id);
            });
    }, []);

    const [reportsDropdownOpen, setReportsDropdownOpen] =
        useState<boolean>(false);
    const [productsDropdownOpen, setProductsDropdownOpen] =
        useState<boolean>(false);
    const [locationDropdownOpen, setLocationDropdownOpen] =
        useState<boolean>(true);

    const toggleReportsDropdown = () => {
        setReportsDropdownOpen(!reportsDropdownOpen);
    };

    const toggleProductsDropdown = () => {
        setProductsDropdownOpen(!productsDropdownOpen);
    };

    const toggleLocationDropdown = () => {
        setLocationDropdownOpen(!locationDropdownOpen);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <img src={Logo} alt="Logo" />
                <p>Neil Bakery</p>
            </div>
            <div className={styles.menuContainer}>
                <div className={styles.dropDownMenuTop}>
                    <div
                        className={styles.dropDownMenuItemTop}
                        onClick={toggleLocationDropdown}
                    >
                        <img
                            className={styles.userIcon}
                            src={UserIcon}
                            alt="Reports Icon"
                        />
                        <p>Locations</p>
                        <DownOutlined className={styles.dropdownIcon} />
                    </div>
                    {locationDropdownOpen && (
                        <div className={styles.dropDownContent}>
                            <ul>
                                {
                                    locations.map((location:{_id:string; name:string}) => {
                                    return (
                                        <li key={location._id} onClick={()=>{
                                            setCurrentLocation(location._id)
                                        }}>{location.name}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <NavLink to={"users"}>
                    <div className={styles.menuItem}>
                        <img className={styles.userIcon} src={UserIcon} />

                        <p>Users</p>
                    </div>
                </NavLink>
                <p className={styles.menuTitle}>Home</p>
                <hr />
                <NavLink to={`/${currentLocation}`}>
                    <div className={styles.menuItem}>
                        <img src={DashboardIcon} alt="Dashboard Icon" />
                        <p>Dashboard</p>
                    </div>
                </NavLink>
                <NavLink to={`/daily-stock-update/${currentLocation}`}>
                    <div className={styles.menuItem}>
                        <img src={StockIcon} alt="Dashboard Icon" />
                        <p>Daily Stock Update</p>
                    </div>
                </NavLink>
                <div className={styles.dropDownMenu}>
                    <div
                        className={styles.dropDownMenuItem}
                        onClick={toggleReportsDropdown}
                    >
                        <img src={ReportsIcon} alt="Reports Icon" />
                        <p>Reports</p>
                        <DownOutlined className={styles.dropdownIcon} />
                    </div>
                    {reportsDropdownOpen && (
                        <div className={styles.dropDownContent}>
                            <ul>
                                <NavLink to={`daily-stock-report/${currentLocation}`}>
                                    <li>Daily Stock</li>
                                </NavLink>
                                <NavLink to={`weekly-stock-report/${currentLocation}`}>
                                    <li>Weekly Stock</li>
                                </NavLink>
                                <NavLink to={`monthly-stock-report/${currentLocation}`}>
                                    <li>Monthly Stock</li>
                                </NavLink>
                            </ul>
                        </div>
                    )}
                </div>
                <div className={styles.dropDownMenu}>
                    <div
                        className={styles.dropDownMenuItem}
                        onClick={toggleProductsDropdown}
                    >
                        <img src={ProductIcon} alt="Product Icon" />
                        <p>Products</p>
                        <DownOutlined className={styles.dropdownIcon} />
                    </div>
                    {productsDropdownOpen && (
                        <div className={styles.dropDownContent}>
                            <ul>
                                <NavLink to={"/products"}>
                                    <li>Product overview</li>
                                </NavLink>
                                <NavLink to={"/add-products"}>
                                    <li>Add Products</li>
                                </NavLink>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
