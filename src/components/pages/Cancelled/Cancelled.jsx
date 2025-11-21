import "./Cancelled.css";

function Cancelled() {
  return (
    <section className="cancel">
      <div className="cancel__card">
        <div className="cancel__icon">✖</div>
        <h1 className="cancel__title">Payment Canceled</h1>
        <p className="cancel__message">
          Your transaction was canceled or could not be completed. Don’t worry —
          no charges were made.
        </p>

        <p className="cancel__subtext">
          If this was a mistake, you can safely retry your checkout. Your items
          are still in your cart.
        </p>

        <div className="cancel__buttons">
          <a href="/checkout" className="cancel__button cancel__button_retry">
            Try Again
          </a>
          <a href="/" className="cancel__button cancel__button_home">
            Return Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default Cancelled;
