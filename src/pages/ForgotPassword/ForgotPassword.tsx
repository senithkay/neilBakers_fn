import styles from "./forgotPassword.module.scss";
import Logo from "../../assets/Logo/logo.png";

const ForgotPassword = () => {
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
                            <p className={styles.title}>Reset Password</p>
                            <p className={styles.description}>
                                Enter your email address and we’ll send you an
                                email with instructions to reset your password
                            </p>
                        </div>
                        <form action="" className={styles.form}>
                            <div className={styles.emailConatainer}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" />
                            </div>
                            <button className={styles.resetButton}>
                                Reset
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

export default ForgotPassword;
