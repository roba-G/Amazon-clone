import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import style from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";

function Header() {
  return (
      <>
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
            <FaSearch />
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
            <a href="">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </a>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            {/* cart */}
          <Link to="/cart" className={style.cart}>
              {/* icon */}
              <BiCart size={35}/>
              <span>0</span>
            </Link>
          </div>
        </div>
      <LowerHeader />
    </>
  );
}

export default Header;
