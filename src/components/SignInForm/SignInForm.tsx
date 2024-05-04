import styles from "./signInForm.module.scss";
import Logo from "../../assets/Logo/logo.png";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {AUTH_USER} from "../../utils/apiRoute.ts";
import {sendPOST} from "../../utils/apiHelper.ts";

const SignInForm = () => {

    const [credentials, setCredentials] = useState({});
    const navigate = useNavigate();
    const handleSignin = (event:any)=>{
        event.preventDefault();
        sendPOST(AUTH_USER, credentials)
        .then((result)=>{
            if (result.data._id){
                navigate('/')
            }
        })
    }

    return (
            <div className={styles.formContainer}>
                <div className={styles.companyDetails}>
                    <img src={Logo}/>
                    <p>Neil Bakery</p>
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.title}>Sign In</p>
                    <p className={styles.description}>Sign in to stay connected.</p>
                </div>
                <form action="" className={styles.form}>
                    <div className={styles.emailConatainer}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(event) => {
                            setCredentials({...credentials, email: event.target.value});
                        }}/>
                    </div>
                    <div className={styles.passwordContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(event) => {
                            setCredentials({...credentials, password: event.target.value});
                        }}/>
                    </div>
                    <div className={styles.forgotContainer}>
                        <div className={styles.rememberContainer}>
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">Remember me ?</label>
                        </div>
                        <a href="/forgot-password">
                            <p>Forgot Password?</p>
                        </a>
                    </div>
                    <button className={styles.siginButton} onClick={handleSignin}>
                        Sign In
                    </button>
                </form>
            </div>

    );
};

// const mapStateToProps = (state: any) => {
// };
//
// const dispatchToProps = (dispatch: any) => ({
//     setUser: () => dispatch({
//         type: ACTION_TYPES.USER_AUTHORIZED,
//         payload: {description: 'Saved all changes', extra: {user: 'me'}}
//     }),
// })
//
// export default connect(mapStateToProps, dispatchToProps)(SignInForm);
//

export default SignInForm;