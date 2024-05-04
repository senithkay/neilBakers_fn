import React, { useState } from "react";
import Styles from "./productsTable.module.scss";
import LeftArrowIcon from "../../assets/Icons/left-arrow-icon.png";
import RightArrowIcon from "../../assets/Icons/right-arrow-icon.svg";
import TableRow from "./ProductsTableRow";

interface TableComponentProps {
  data: {
    productName: React.ReactNode;
    sku: string;
    _id:string;
  }[];
  onDelete: (id:string) => void;
}

const ProductTable: React.FC<TableComponentProps> = ({ data, onDelete }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage: number = 10;
  const totalPages: number = Math.ceil(data.length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate the range for the last page
  const lastPageStartIndex: number = (totalPages - 1) * itemsPerPage;
  const lastPageEndIndex: number = data.length;

  const renderRows = () => {
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return data
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <TableRow onDelete={onDelete} id={item._id} key={index} product={item.productName} sku={item.sku} />
      ));
  };

  return (
    <table className={Styles.table}>
      <thead className={Styles.tableHead}>
        <tr className={Styles.tr}>
          <th className={Styles.th1}>Product</th>
          <th className={Styles.th2}>SKU</th>
          <th className={Styles.th3}>Action</th>
        </tr>
      </thead>
      <tbody className={Styles.tableBody}>{renderRows()}</tbody>
      <tfoot className={Styles.tableFoot}>
        <p className={Styles.pageCount}>
          Showing{" "}
          {currentPage === totalPages
            ? lastPageStartIndex + 1
            : currentPage * itemsPerPage - itemsPerPage + 1}
          -
          {currentPage === totalPages
            ? lastPageEndIndex
            : currentPage * itemsPerPage}{" "}
          from {data.length}
        </p>
        <div className={Styles.movePageButtons}>
          <button
            className={`${Styles.prevButton} ${
              currentPage === 1 ? Styles.inactive : Styles.active
            }`}
            onClick={() => handleClick(currentPage - 1)}
          >
            <img src={LeftArrowIcon} alt='Previous' />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${Styles.moveButton} ${
                currentPage === i + 1 ? Styles.active : ""
              }`}
              onClick={() => handleClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`${Styles.nextButton} ${
              currentPage === totalPages ? Styles.inactive : Styles.active
            }`}
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={RightArrowIcon} alt='Next' />
          </button>
        </div>
      </tfoot>
    </table>
  );
};

export default ProductTable;
