import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Row from './prebuilt/Row';
import BillingDetailsFields from './prebuilt/BillingDetailsFields';
import SubmitButton from './prebuilt/SubmitButton';
import CheckoutError from './prebuilt/CheckoutError';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = (props) => {
  const history = useHistory();
  const price = props.location.state.total === undefined ? 0 : props.location.state.total;
  const orderId = props.location.state.orderId;
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post('/api/stripe/charge', {
        amount: price * 100,
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }

      await axios.put(`/api/orders/isPaid/${orderId}`)
      history.push('/successfulCheckout');
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "#fff",
      fontSize: "16px",
      iconColor: "#fff",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (
    <div>
      <div>Checkout:</div>
      <form onSubmit={handleFormSubmit}>
        <Row>
          <BillingDetailsFields />
        </Row>
        <Row>
          <CardElementContainer>
            <CardElement
              options={cardElementOpts}
              onChange={handleCardDetailsChange}
            />
          </CardElementContainer>
        </Row>
        {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
        <Row>
          <SubmitButton disabled={isProcessing || !stripe}>
            {isProcessing ? "Processing..." : `Pay $${price}`}
          </SubmitButton>
        </Row>
      </form>
    </div>
  );
};

export default CheckoutForm;
