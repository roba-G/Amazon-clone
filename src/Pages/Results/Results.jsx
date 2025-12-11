import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endpoints";
import ProductCard from "../../Components/Product/ProductCard";
import style from './results.module.css'
import Loader from "../../Components/Loader/Loader";
function Results() {
    const [result, setResult] = useState();
const [isLoading, setIsLoading] = useState(false);
    const { categoryName } = useParams();
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${productUrl}/products/category/${categoryName.toLowerCase()}`)
            .then((res) => {
                setResult(res.data);
                setIsLoading(false);
                console.log(res);
            });
    }, [categoryName]);

 
    return ( 
      <LayOut>
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
          <hr />
                { isLoading ? <Loader /> : (
                    <div className={style.products_container}>
                        {result?.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </div>)}
        </section>
      </LayOut>
    );
}

export default Results;
