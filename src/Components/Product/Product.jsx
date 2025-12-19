
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from './ProductCard'
import style from './product.module.css'
import Loader from "../Loader/Loader";
function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data)
        console.log(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err); 
        setIsLoading(false);
      })
  }, []);
  return (
    <>
      {
        isLoading ? (<Loader />) : (
        <div className={style.product_container}>
          {product?.map((singleProduct) => {
            return <ProductCard data={singleProduct} key={singleProduct.id}
            renderAdd={true}/>;
          })}
        </div>
        )
      }
    </>
  )
}

export default Product;
