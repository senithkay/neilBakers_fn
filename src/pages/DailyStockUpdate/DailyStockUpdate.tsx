import StockTable from "../../components/StockTable/StockTable";
import styles from "./dailyStockUpdate.module.scss";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendGET, sendPOST} from "../../utils/apiHelper.ts";
import {GET_PRODUCTS, GET_STOCK, SAVE_DAILY_STOCK} from "../../utils/apiRoute.ts";

const DailyStockUpdate = () => {
    const [stock, setStock] = useState({})
    const [stocks, setStocks] = useState([] as any)
    const [products, setProducts] = useState([]);

    const {id} = useParams();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (id !== undefined&& id.length>0){
            const payload = {
                branchId: id,
                stock: stock
            }
            sendPOST(SAVE_DAILY_STOCK, payload)
            .then(async (jsonData) => {
                    if (jsonData.data._id !== undefined) {
                        const newStocks = stocks.filter((stock:any)=> (stock.productId.productName !== jsonData.data.productId.productName || stock.date !== jsonData.data.date) );
                        newStocks.push(jsonData.data)
                        setStocks(newStocks)
                    }
                });
        }
    };
    useEffect(() => {
        sendGET(GET_PRODUCTS, []).then((jsonData) => {
                setProducts(jsonData.data);
            });
        const params = [{key: "id", value: id}];
        sendGET(GET_STOCK, params).then((jsonData) => {
                setStocks(jsonData.data);
            });

    }, [id]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContainer}>
                <div className={styles.topContainer}>
                    <p>Daily Stock Update</p>
                </div>
                <div className={styles.middleContainer}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Select product</label>
                        <select name="" id="" onChange={(event) => {
                            setStock({...stock, productId: event.target.value});
                        }}>
                            <option value={""}></option>
                            {products.map((product: any) => {
                                return (
                                    <option value={product._id}>{product.sku}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Select Date</label>
                        <input type="date" onChange={(event) => {
                            setStock({ ...stock, date: event.target.value });
                        }}/>
                    </div>
                    <br />
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Available stock</label>
                        <input type="number" onChange={(event) => {
                            setStock({ ...stock, availableStock: event.target.value });
                        }}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Remaining stock</label>
                        <input type="number" onChange={(event) => {
                            setStock({ ...stock, remainingStock: event.target.value });
                        }}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Sold units</label>
                        <input type="number" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Price per unit</label>
                        <input type="number" onChange={(event) => {
                            setStock({ ...stock, pricePerUnit: event.target.value });
                        }}/>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Total sales</label>
                        <input type="number" />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="">Cost of remaining stock</label>
                        <input type="number" />
                    </div>
                    <button onClick={handleSubmit}>Save</button>
                </div>
                <StockTable data={stocks} />
            </div>
        </div>
    );
};

export default DailyStockUpdate;
