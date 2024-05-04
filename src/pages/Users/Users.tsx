/*eslint-disable*/
import styles from "./users.module.scss";
import Logo from "../../assets/Logo/logo.png";
import EditIcon from "../../assets/Icons/pen-icon.svg";
import DeleteIcon from "../../assets/Icons/delete-gray-icon.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {sendGET} from "../../utils/apiHelper.ts";
import {GET_USER} from "../../utils/apiRoute.ts";

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function deleteUser(key: any) {
    const newUsers = users.filter((user: any) => user._id !== key);
    setUsers([...newUsers]);
  }
  useEffect(() => {
    sendGET(GET_USER, [])
      .then((jsonData) => {
        setUsers(jsonData.data);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <DeleteModal
          type={'user'}
        deleteFunction={deleteUser}
        id={selectedUser}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.companyDetails}>
            <img src={Logo} />
            <p>Neil Bakery</p>
          </div>
          <div className={styles.userList}>
            {users.map((user: any) => {
              return (
                <div key={user._id} className={styles.user}>
                  <p>{user.username}</p>
                  <div className={styles.action}>
                    <button>
                      <img src={EditIcon} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user._id);
                        setOpenModal(true);
                      }}
                    >
                      <img src={DeleteIcon} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to={"/add-user"}>
            <button className={styles.addUserButton}>Add User</button>
          </Link>
        </div>
        <div className={styles.rightContainer}>
          <img src={Logo} />
        </div>
      </div>
    </div>
  );
};

export default Users;
