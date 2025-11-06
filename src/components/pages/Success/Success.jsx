import "./Success.css";

function Success({ setCartList }) {
  const handleClearList = () => {
    setCartList([]);
    localStorage.removeItem("cart");
  };

  return (
    <section className="success">
      <h2 className="success__title">
        Payment was Successful, Order will be shipped now!
      </h2>
      <button className="success__clear-button" onClick={handleClearList}>
        Finish Transaction!
      </button>
    </section>
  );
}

export default Success;
