import { useEffect, useState } from "react";
import ProductTable from "../../components/ProductsTable/ProductsTable";
import styles from "./allProducts.module.scss";

const AllProducts = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/product/", {credentials: 'include'})
      .then((result) => {
        return result.json();
      })
      .then((jsonData) => {
        setTableData(jsonData.data);
      });
  }, []);


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
      <ProductTable data={tableData} />
    </div>
  );
};

export default AllProducts;
