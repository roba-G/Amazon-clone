
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from './ProductCard'
import style from './product.module.css'
function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProduct(res.data)).catch((err) => { console.log(err); })
  }, []);
  return (
  <div className={style.product_container} >
  {
    product?.map((singleProduct) => {
      return <ProductCard data={singleProduct} key={singleProduct.id} />
    })
  } 
    </div >
  )
  
}

export default Product;
