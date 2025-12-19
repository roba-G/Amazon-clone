import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import style from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {

  const [{ basket, user }, dispatch] = useContext(DataContext);
  
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0)

  return (
      <div className={style.fixed}>
        <div className={style.header_container}>
          <div className={style.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="amazon logo"
              />
            </Link>
            {/* delivery */}
            <div className={style.delivery}>
              <span>
                {/*icon*/}
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={style.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search products" />
            <FaSearch size={38}/>
            {/* Icons */}
          </div>
          {/* right side link */}
          <div className={style.order_container}>
            <Link to="" className={style.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* three components */}
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                <p>Hello {user?.email?.split('@'[0])}</p>
                <span onClick={()=>auth.signOut()}>Sign Out</span>
                </>
              ) : (
                  <>
                  <p>Hello Sign In</p>
                  <span>Account & Lists</span>
                  </>
                )
              }
            </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            {/* cart */}
          <Link to="/cart" className={style.cart}>
              {/* icon */}
              <BiCart size={35}/>
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      <LowerHeader />
    </div>
  );
}

export default Header;
