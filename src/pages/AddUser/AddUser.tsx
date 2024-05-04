import styles from "./addUser.module.scss";
import Logo from "../../assets/Logo/logo.png";
import { useEffect, useState } from "react";
import { navigate } from "vike/client/router";
import {sendGET, sendPOST} from "../../utils/apiHelper.ts";
import {GET_BRANCHES, SAVE_USER} from "../../utils/apiRoute.ts";

const AddUser = () => {
  const [user, setUser] = useState({});
  const [locations, setLocations] = useState([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    sendPOST(SAVE_USER, user).then(async (jasonData) => {
        if (jasonData.data._id !== undefined) {
          await navigate("/users");
        }
      });
  };

  useEffect(() => {
    sendGET(GET_BRANCHES, [])
       .then((jsonData) => {
        setLocations(jsonData.data);
      });
  }, []);

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
              <p className={styles.description}>create an admin</p>
            </div>
            <form action='' className={styles.form}>
              <div className={styles.nameContainer}>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  onChange={(event) => {
                    setUser({ ...user, email: event.target.value });
                  }}
                />
              </div>
              <div className={styles.locationContainer}>
                <label htmlFor='location'>Location</label>
                <select
                  onChange={(event) => {
                    setUser({ ...user, location: event.target.value });
                  }}
                >
                  <option value={""}></option>
                  {locations.map((location: {_id:string; name:string}) => {
                    return (
                      <option value={location._id}>{location.name}</option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.usernameContainer}>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id='username'
                  onChange={(event) => {
                    setUser({ ...user, username: event.target.value });
                  }}
                />
              </div>
              <div className={styles.passwordContainer}>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  onChange={(event) => {
                    setUser({ ...user, password: event.target.value });
                  }}
                />
              </div>
              <button onClick={handleSubmit} className={styles.createButton}>
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

export default AddUser;
