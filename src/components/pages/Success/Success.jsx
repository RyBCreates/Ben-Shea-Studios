import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Success.css";

function Success({ setCartList }) {
  useEffect(() => {
    setCartList([]);
    localStorage.removeItem("cart");
  }, []);

  // const handleClearList = () => {
  // TODO: Navigate User to home page
  // };

  return (
    <section className="success">
      <div className="success__card">
        <div className="success__icon">✔</div>
        <h1 className="success__title">Payment Successful!</h1>
        <p className="success__message">
          Your transaction was completed successfully. Thank you for your
          purchase!
        </p>

        <p className="success__subtext">
          Your order will be processed and shipped soon.
        </p>

        <div className="success__buttons">
          <Link
            to="/"
            className="success__button success__button_finish"
            // onClick={handleClearList}
          >
            <li>Finish Transaction</li>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Success;
