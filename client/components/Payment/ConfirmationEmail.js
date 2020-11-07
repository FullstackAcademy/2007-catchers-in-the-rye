/* eslint-disable react/jsx-filename-extension */
export default function ConfirmationEmail(billingDetails, total, costumes) {
  const { name, address } = billingDetails;
  return `<p>Hi ${name},</p>
      <p>Thank you for shopping at Grace Shoppers, where the only thing spooookier than Halloween...is how low our prices are!</p>
      <p>Below is your order confirmation:</p>
      <ul>
        ${costumes.map(costume => {
    return `<li>${costume.costumeName}, ${costume.lineitem.quantity} units, $${costume.price} each</li>`}).join('')}
      </ul>
      <p>Total: ${total}</p>
      <p>Shipping address: ${address.city} ${address.line1} ${address.state} ${address.postal_code}</p>
      <p>If you have any questions, please reply to this email.</p>
      <p>Thanks,</p>
      <p>The Grace Shocker Team</p>`;
}
