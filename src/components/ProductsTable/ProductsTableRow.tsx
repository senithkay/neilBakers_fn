import React, { useState } from "react";
import Styles from "./productsTableRow.module.scss";
import EyeIcon from "../../assets/Icons/eye-icon.svg";
import EditIcon from "../../assets/Icons/pen-icon.svg";
import DeleteIcon from "../../assets/Icons/delete-gray-icon.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import {Link} from "react-router-dom";


interface TableRowProps {
    product: React.ReactNode;
    sku: string;
    id:string
    onDelete: (id: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
    product,
    sku,
    id,
    onDelete
}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <tr className={Styles.tr}>
            <DeleteModal type={'product'} deleteFunction={onDelete}
                         id={id} open={openModal} onClose={() => setOpenModal(false)} />
            <div className={Styles.td}>
                <td className={Styles.td1}>
                    {product}
                </td>
                <td className={Styles.td2}>{sku}</td>
                <td className={Styles.td3}>
                    <div className={Styles.action}>
                        <button>
                            <img src={EyeIcon} />
                        </button>
                        <Link to={`/add-products/${id}`}>
                            <button>
                                <img src={EditIcon}/>
                            </button>
                        </Link>
                        <button onClick={() => setOpenModal(true)}>
                        <img src={DeleteIcon} />
                        </button>
                    </div>
                </td>
            </div>
        </tr>
    );
};

export default TableRow;
