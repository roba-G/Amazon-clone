import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from '../../Components/Product/ProductCard'
import { DataContext } from "../../Components/DataProvider/DataProvider";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import style from './cart.module.css'
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
function Cart() {
    const [{ basket, user }, dispatch] = useContext(DataContext);
    const total = basket.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0)

    const increment = (item) => {
        dispatch({
            type:Type.ADD_TO_BASKET, item
        })
    }

    const decrement = (id) => {
        dispatch({
            type:Type.REMOVE_FROM_BASKET, id
        })
    }

  return (
    <LayOut>
      <section className={style.container}>
        <div className={style.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket?.map((item, i) => {
                return (
                  <section className={style.cart_product}>
                    <ProductCard
                      key={i}
                      data={item}
                      renderdesc={true}
                      flex={true}
                      renderAdd={false}
                    />
                    <div className={style.btn_container}>
                      <button
                        className={style.btn}
                        onClick={() => increment(item)}
                      >
                        <IoIosArrowUp />
                      </button>
                      <span>{item.amount}</span>
                      <button
                        className={style.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <IoIosArrowDown />
                      </button>
                    </div>
                  </section>
                );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={style.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment"> Continue to checkout </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
