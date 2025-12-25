import React, {useContext, useEffect, useState} from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import style from './orders.module.css'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from '../../Components/Product/ProductCard';
// import { db } from '../../Utility/firebase';

function Orders() {

  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    if (!user) {
       setOrders([]);
    return;
  }
      // db.collection('users').doc(user.uid).collection('orders').orderBy('created', 'desc').onSnapshot((snap) => {
      //   console.log(snap);

      //   setOrders(snap.docs.map((doc) => ({
      //       id: doc.id,
      //       data: doc.data(),
      //   })))

      // })
      const ordersRef = collection(db, "users", user.uid, "orders");

      const q = query(ordersRef, orderBy("created", "desc"));

       const unsubscribe = onSnapshot(q, (snapshot) => {
         setOrders(
           snapshot.docs.map((doc) => ({
             id: doc.id,
             data: doc.data(),
           }))
         );
       });
    
    return () => unsubscribe();
    
  }, [user]);
  return (

      <LayOut>
      <section className={style.container}>
        <div className={style.orders_container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && <div style={{padding: '20px'}}>you don't have orders yet.</div>}
          <div>
            {
              orders?.map((order) => {
                return (
                  <div>
                    <hr />
                    <p>Order ID: {order?.id}</p>
                    {
                      order?.data?.basket?.map((ord => {
                        return (<ProductCard flex={true} data={ord} key={ord.id} />
                        )
                      }))
                    }
                    </div>
                )
              })
          }
          </div>
        </div>
          </section>
      </LayOut>
 
  );
}

export default Orders
