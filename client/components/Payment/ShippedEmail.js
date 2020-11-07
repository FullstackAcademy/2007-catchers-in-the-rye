/* eslint-disable react/jsx-filename-extension */
export default function ShippedEmail(order) {
  const {
    name, total, shippingAddress, costumes,
  } = order;
  return `<p>Hi ${name},</p>
        <p>Your order has been shipped, and should arrive in 3-5 business days!</p>
        <p>Below is your order confirmation:</p>
        <ul>
          ${costumes.map(costume => {
    return `<li>${costume.costumeName}, ${costume.lineitem.quantity} units, $${costume.price} each</li>`}).join('')}
        </ul>
        <p>Total: $${total}</p>
        <p>Shipping address: ${shippingAddress}</p>
        <p>If you have any questions, please reply to this email.</p>
        <p>Thanks,</p>
        <p>The Grace Shocker Team</p>`;
}
