import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import style from "./payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setcardError] = useState(null);

  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setcardError(e?.error?.message);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // 1) contact to the backend to the client secret
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2) client side (react side confirmation)

      // const confirmation = await stripe.confirmCardPayment(clientSecret, {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(confirmation);

      // 3 after the confirmation  ---> order fs db save, clear basket

      //  ihave to firs go to firebase and turn on the firestore db

      // await db
      //   .collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });

      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);

      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={style.payment_header}>Checkout ({totalItem}) items</div>

      <section className={style.payment}>
        <div className={style.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div className={style.flex}>
          <h3>Review Items and delivery</h3>
          <div>
            {basket?.map((item) => {
              return <ProductCard data={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />

        <div className={style.flex}>
          <h3>Payment Methods</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                <div className={style.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={style.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
