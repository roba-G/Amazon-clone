import React from "react";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import style from "./product.module.css";

function ProductCard({ data }) {
  const { image, title, id, rating, price } = data;
  return (
    <div className={style.card_container}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={style.rating}>
          <Rating
            name="half-rating"
            defaultValue={rating.rate}
            precision={0.1}
          />
          {/* rating count */}
          <small>{rating.count}</small>
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
