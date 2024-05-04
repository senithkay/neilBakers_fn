import React, { useState, useRef, useEffect } from 'react';
import styles from "./navbar.module.scss";
import ProfileIcon from "../../assets/Images/profile-pic.png";
import { CaretDownOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const Navbar: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [isRotated, setIsRotated] = useState<boolean>(false); // Add state for rotation
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:3000/temporary/user", {credentials: 'include'})
            .then((result) => {
                if (result.status === 401){
                    navigate('/signin')
                }
                return result.json();
            })
            .then((jsonData) => {
                console.log(JSON.stringify(jsonData.data));
                setUser(jsonData.data);
            });
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // Clicked outside the dropdown, close it
                setDropdownVisible(false);
                setIsRotated(false); // Reset rotation state
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        setIsRotated(!isRotated); // Toggle rotation state
    };

    const handleSignOut = () => {
        fetch("http://localhost:3000/auth/logout", {credentials: 'include'})
            .then((result) => {
                return result.json();
            })
            .then(() => {
                navigate('/signin')
            });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.navContainer}>
                <div className={styles.profileContainer}>
                    <img src={ProfileIcon} alt="Profile"/>
                    <p className={styles.profileName}>{user.username}</p>
                    <p className={styles.profileRole}>{user.isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
                    <CaretDownOutlined className={`${styles.downArrow} ${isRotated ? styles.rotated : ''}`}
                                       onClick={toggleDropdown}/>
                </div>
                {dropdownVisible && (
                    <div ref={dropdownRef} className={styles.dropdownContainer}>
                        <button className={styles.signoutButton} onClick={handleSignOut}>Sign Out</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;