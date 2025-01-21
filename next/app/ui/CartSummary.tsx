import React, { PureComponent } from "react";

type CartSummaryProps = {
  totalItems: number;
  totalPrice: number;
};

class CartSummary extends PureComponent<CartSummaryProps> {
  render() {
    const { totalItems, totalPrice } = this.props;

    console.log("Rendering CartSummary...");
    return (
      <div className="cart-summary">
        <p>
          <strong>Total Items:</strong> {totalItems}
        </p>
        <p>
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </p>
      </div>
    );
  }
}

export default CartSummary;
