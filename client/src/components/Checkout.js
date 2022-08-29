import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PaymentForm from "./PaymentForm";

const Checkout = () => {
  const location = useLocation();
  const info = location.state;
  return (
    <PaymentForm />
  )
}

export default Checkout;