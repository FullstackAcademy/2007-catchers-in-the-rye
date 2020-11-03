/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

// eslint-disable-next-line react/prefer-stateless-function
class Checkout extends Component {
  render() {
    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <div>
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
            {/* TIP always disable your submit button while processing payments */}
            <SubmitButton disabled={isProcessing || !stripe}>
            {isProcessing ? "Processing..." : `Pay $${price}`}
            </SubmitButton>
        </Row>
        </form>
  );
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
