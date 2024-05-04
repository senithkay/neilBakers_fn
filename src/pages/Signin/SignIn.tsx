import styles from './signin.module.scss';
import Logo from '../../assets/Logo/logo.png';
import SignInForm from '../../components/SignInForm/SignInForm';

const SignIn = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
            <div className={styles.leftContainer}>
                <SignInForm />
            </div>
            <div className={styles.rightContainer}>
                <img src={Logo} />
            </div>
        </div> 
    </div>
  )
}

export default SignIn