import React from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import style from "./product.module.css";
import { Link } from "react-router-dom";

function ProductCard({ data , flex, renderdesc}) {
  const { image, title, id, rating, price, description } = data;
  // console.log(description);
  return (
    <div className={`${style.card_container} ${flex?style.product_flexed: ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {
          renderdesc && <div style={{ maxWidth: '750px' }}>{description}</div>
        }
        <div className={style.rating}>
          <Rating
            name="half-rating"
            defaultValue={rating?.rate}
            precision={0.1}
          />
          {/* rating count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className={style.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
