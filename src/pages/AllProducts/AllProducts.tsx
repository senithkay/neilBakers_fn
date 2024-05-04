import { useEffect, useState } from "react";
import ProductTable from "../../components/ProductsTable/ProductsTable";
import styles from "./allProducts.module.scss";
import {sendGET} from "../../utils/apiHelper.ts";
import {GET_PRODUCTS} from "../../utils/apiRoute.ts";

const AllProducts = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    sendGET(GET_PRODUCTS, []).then((jsonData) => {
        setTableData(jsonData.data);
      });
  }, []);

  const onDelete = (id:string)=> {
    const newTableData = tableData.filter((item:any) => item._id !== id);
    setTableData([...newTableData]);
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <p>Product List</p>
        <div className={styles.sortingContainer}>
          <input
            type='search'
            className={styles.searchBar}
            placeholder='Search…'
          />
          <select className={styles.sortingSelect}>
            <option disabled selected className={styles.default}>
              Filter By
            </option>
            <option value='price'>Price</option>
            <option value='rating'>Rating</option>
          </select>
        </div>
      </div>
      <ProductTable onDelete={onDelete} data={tableData} />
    </div>
  );
};

export default AllProducts;
