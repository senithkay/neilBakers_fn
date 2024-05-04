import React, { useState } from "react";
import {
    CloseOutlined,
    CloudUploadOutlined,
} from "@ant-design/icons";
import styles from "./fileUploader.module.scss";

const FileUploader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

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

    return (
        <div
            className={styles.uploadContainer}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {files.length === 0 ? (
                <>
                    <CloudUploadOutlined className={styles.uploadIcon} />
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
    );
};

export default FileUploader;
