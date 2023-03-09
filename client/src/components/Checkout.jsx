import PaymentForm from "./PaymentForm";
import { useEffect, useState } from "react"

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);


const Checkout = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [])

  return message ? (
    <Message message={message} />
  ) : (
    <PaymentForm />
  )
}

export default Checkout;