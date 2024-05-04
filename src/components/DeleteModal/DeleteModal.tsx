import React from "react";
import styles from "./deleteModal.module.scss";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import DeleteIcon from "../../assets/Icons/delete-icon.svg";
import {sendDELETE} from "../../utils/apiHelper.ts";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  id: any;
  deleteFunction: (id:string)=>any;
  type:string
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  id,
  deleteFunction, type
}) => {
  const handleDelete = () => {
    let url = ''
    url =`/${type}`
    const params = [{key: id, value: id}];
    onClose()
    sendDELETE(url, params)
   .then((jsonData) => {
        if (jsonData.data._id !== undefined) {
          deleteFunction(jsonData.data._id);
          onClose();
        }
      });
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.topContainer}>
          <CloseOutlined
            onClick={onClose}
            style={{ width: "1rem", height: "1rem", color: "#858D9D" }}
          />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.iconContainer}>
            <img src={DeleteIcon} alt='delete-icon' />
          </div>
          <p className={styles.textTitle}>Delete Product</p>
          <p className={styles.textDescription}>
            Do you want to delete this product? This action can’t be undone
          </p>
        </div>
        <div className={styles.bottomContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
