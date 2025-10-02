import { loadStripe } from "@stripe/stripe-js";

import "./Checkout.css";

function Checkout() {
  const stripePromise = loadStripe(
    "pk_test_51SDWFrAg1BofyoLMJLZaZm0qaoIgLmarxMVA6PAF1Un1yLQUjc6eBWE19gnYbWR53pldAUn1cIxBp1MtL8rgGQMV005euKVUOg"
  );

  return (
    <section className="checkout">
      <button className="checkout__submit-button">Place Order!</button>
    </section>
  );
}

export default Checkout;
