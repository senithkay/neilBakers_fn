
import styles from "./addProducts.module.scss";
import React, {useState} from "react";
import {CloseOutlined, CloudUploadOutlined} from "@ant-design/icons";
import { useParams , useNavigate} from 'react-router-dom';
import {sendPOSTFORMDATA} from "../../utils/apiHelper.ts";
import {SAVE_PRODUCT} from "../../utils/apiRoute.ts";

const AddProducts: React.FC = () => {
    const [inputData, setInputData] = useState<any>({});
    const [files, setFiles] = useState<File[]>([]);
    const {id} = useParams();

    const navigate = useNavigate()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            const filteredFiles = fileList.filter(
                (file) =>
                    file.type === "image/jpeg" || file.type === "image/png"
            );
            setFiles([...files, ...filteredFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const fileList = Array.from(e.dataTransfer.files);
            const filteredFiles = fileList.filter(
                (file) =>
                    file.type === "image/jpeg" || file.type === "image/png"
            );
            setFiles([...files, ...filteredFiles]);
        }
    };

    const handleDelete = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('productName', inputData.productName)
        formData.append('sku', inputData.sku)
        formData.append('description', inputData.description)
        formData.append('price', inputData.price)
        formData.append('image', files[0])
        sendPOSTFORMDATA(SAVE_PRODUCT, formData)
        .then(async (jasonData) => {
                if (jasonData.data._id !== undefined) {
                    navigate('/products')
                }
            });
    };

  return (
    <form className={styles.wrapper}>
      <div className={styles.topContainer}>
        <p className={styles.pageTitle}>{id}</p>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <label>Product Name</label>
            <input type='text' onChange={(event) => {
                setInputData({ ...inputData, productName: event.target.value });
            }}/>
          </div>
          <div className={styles.inputWrapper}>
            <label>SKU</label>
            <input type='text' onChange={(event) => {
                setInputData({ ...inputData, sku: event.target.value });
            }}/>
          </div>
          <div className={styles.inputWrapper}>
            <label>Price</label>
            <input type='text' onChange={(event) => {
                setInputData({ ...inputData, price: event.target.value });
            }}/>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.descriptionText}>Description</label>
          <textarea onChange={(event) => {
              setInputData({ ...inputData, description: event.target.value });
          }}/>
        </div>
      </div>
        <div className={styles.bottomContainer}>
            <div
                className={styles.uploadContainer}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {files.length === 0 ? (
                    <>
                        <CloudUploadOutlined className={styles.uploadIcon}/>
                        <p className={styles.uploadText}>
                            Drop your image here or{" "}
                            <label htmlFor="fileInput">Browse</label>
                        </p>
                        <p className={styles.supportText}>Support JPG, JPEG, PNG</p>
                        <input
                            type="file"
                            id="fileInput"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                        />
                    </>
                ) : (
                    <>
                        <div className={styles.filePreviewContainer}>
                            {files.map((file, index) => (
                                <div key={index} className={styles.filePreview}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${file.name}`}
                                        className={styles.previewImage}
                                    />
                                    <CloseOutlined
                                        className={styles.closeButton}
                                        onClick={() => handleDelete(index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            multiple
                        />
                    </>
                )}
            </div>
        </div>
        <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default AddProducts;
