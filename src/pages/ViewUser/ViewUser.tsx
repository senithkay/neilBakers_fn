import styles from "./viewUser.module.scss";
import Logo from "../../assets/Logo/logo.png";

const ViewUser = () => {    
    return (
        <div className={styles.wrapper}>        
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.companyDetails}>
                        <img src={Logo} />
                        <p>Neil Bakery</p>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.textContainer}>
                            <p className={styles.title}>Hi ! Super Admin</p>
                            <p className={styles.description}>
                                create an admin
                            </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.nameContainer}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" />
                            </div>
                            <div className={styles.locationContainer}>
                                <label htmlFor="location">Location</label>
                                <select>
                                    <option value="location1">
                                        Location 1
                                    </option>
                                    <option value="location2">
                                        Location 2
                                    </option>
                                </select>
                            </div>
                            <div className={styles.usernameContainer}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" />
                            </div>
                            <div className={styles.passwordContainer}>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" />
                            </div>
                            <button className={styles.createButton}>
                                Create
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <img src={Logo} />
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
