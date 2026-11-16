import React, { useState } from 'react';
import { useUser } from 'contexts/user-context';
import { useCart } from 'contexts/cart-context';
import { useGamification } from 'contexts/gamification-context';
import { IOrder } from 'models';
import formatPrice from 'utils/formatPrice';
import * as S from './style';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'Google Pay / UPI', icon: '⚡', sub: 'Instant Zero Fee' },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳', sub: 'Visa, Master, Amex' },
  { id: 'applepay', name: 'Apple Pay / Klarna', icon: '🍏', sub: 'Buy Now, Pay Later' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', sub: 'Pay upon delivery' },
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    profile,
    addOrder,
    openProfile,
    showToast,
  } = useUser();

  const {
    products,
    total,
    appliedPromo,
    clearCart,
    closeCart,
  } = useCart();

  const { coins, awardCoins } = useGamification();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [shippingForm, setShippingForm] = useState({
    fullName: profile.shippingAddress.fullName || profile.name,
    line1: profile.shippingAddress.line1 || 'Flat 402, Cyber Heights',
    city: profile.shippingAddress.city || 'Gurugram',
    state: profile.shippingAddress.state || 'Haryana',
    postalCode: profile.shippingAddress.postalCode || '122001',
    phone: profile.shippingAddress.phone || profile.phone,
  });

  const [redeemCoins, setRedeemCoins] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<IOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  // Coin discount logic: Redeem 250 coins for ₹50 off if balance >= 250
  const coinDiscount = redeemCoins && coins >= 250 ? Math.min(100, Math.floor(coins / 5)) : 0;

  const basePrice = total.discountPrice && total.discountPrice < total.totalPrice
    ? total.discountPrice
    : total.totalPrice;

  const finalPrice = Math.max(0, basePrice - coinDiscount);

  const handlePlaceOrder = () => {
    const orderId = 'VC-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNo = 'EXPRESS-' + Math.floor(10000000 + Math.random() * 90000000);
    const coinsEarned = Math.round(finalPrice * 0.1);

    const newOrder: IOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: [...products],
      totalPrice: finalPrice,
      currencyFormat: total.currencyFormat || '₹',
      currencyId: total.currencyId || 'INR',
      status: 'Confirmed',
      paymentMethod:
        PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || 'UPI',
      trackingNumber: trackingNo,
      coinsEarned: coinsEarned,
      appliedPromo: appliedPromo || (redeemCoins ? 'COIN_REWARD' : undefined),
    };

    // Save order
    addOrder(newOrder);

    // Award loyalty coins
    awardCoins(coinsEarned, `Purchase Reward: Order #${orderId}`);

    // Empty cart
    clearCart();
    closeCart();

    // Set success screen
    setOrderSuccess(newOrder);
    showToast(`Order #${orderId} placed! +${coinsEarned} VibeCoins earned!`, 'reward', '🎉');
  };

  const handleCloseAll = () => {
    setOrderSuccess(null);
    closeCheckout();
  };

  const handleViewInProfile = () => {
    setOrderSuccess(null);
    closeCheckout();
    openProfile('orders');
  };

  return (
    <S.Overlay onClick={handleCloseAll}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <div className="title-wrap">
            <h3>🔒 EXPRESS CHECKOUT</h3>
            <p>256-Bit Encrypted • Fast-Track Gen-Z Fulfillment</p>
          </div>
          <button
            className="close-btn"
            onClick={handleCloseAll}
            aria-label="Close checkout"
          >
            ✕
          </button>
        </S.Header>

        {orderSuccess ? (
          <S.SuccessView>
            <div className="success-badge">✓</div>
            <h2>ORDER CONFIRMED!</h2>
            <p>
              Thank you for shopping with <strong>VIBECART STUDIO</strong>. Your archival pieces have been reserved and are being prepared for dispatch.
            </p>

            <div className="order-details-card">
              <div className="row">
                <span>Order Reference:</span>
                <strong>#{orderSuccess.id}</strong>
              </div>
              <div className="row">
                <span>Tracking Number:</span>
                <strong style={{ fontFamily: 'monospace', color: '#00ff88' }}>
                  {orderSuccess.trackingNumber}
                </strong>
              </div>
              <div className="row">
                <span>Estimated Delivery:</span>
                <strong>2-3 Business Days</strong>
              </div>
              <div className="row">
                <span>Total Paid:</span>
                <strong>
                  {orderSuccess.currencyFormat}
                  {formatPrice(orderSuccess.totalPrice, orderSuccess.currencyId)}
                </strong>
              </div>
              <div className="row">
                <span>Loyalty Reward:</span>
                <strong style={{ color: '#ffd700' }}>
                  +{orderSuccess.coinsEarned} VibeCoins Added 🪙
                </strong>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="primary" onClick={handleViewInProfile}>
                📦 View Order in Dashboard
              </button>
              <button className="secondary" onClick={handleCloseAll}>
                Continue Shopping →
              </button>
            </div>
          </S.SuccessView>
        ) : (
          <>
            <S.Body>
              {/* Shipping Address */}
              <S.Section>
                <div className="section-head">
                  <h4>📍 1. Delivery Address</h4>
                  <span>Editable Destination</span>
                </div>
                <S.FormRow>
                  <S.InputGroup>
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingForm.fullName}
                      onChange={handleInputChange}
                      placeholder="Receiver's name"
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleInputChange}
                      placeholder="Delivery contact"
                    />
                  </S.InputGroup>
                </S.FormRow>
                <div style={{ marginTop: '12px' }}>
                  <S.InputGroup>
                    <label>Street Address / Apartment</label>
                    <input
                      type="text"
                      name="line1"
                      value={shippingForm.line1}
                      onChange={handleInputChange}
                      placeholder="Street address"
                    />
                  </S.InputGroup>
                </div>
                <S.FormRow style={{ marginTop: '12px' }}>
                  <S.InputGroup>
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingForm.city}
                      onChange={handleInputChange}
                    />
                  </S.InputGroup>
                  <S.InputGroup>
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingForm.postalCode}
                      onChange={handleInputChange}
                    />
                  </S.InputGroup>
                </S.FormRow>
              </S.Section>

              {/* Payment Methods */}
              <S.Section>
                <div className="section-head">
                  <h4>💳 2. Payment Method</h4>
                  <span>Select Preferred Channel</span>
                </div>
                <S.PaymentGrid>
                  {PAYMENT_METHODS.map((pm) => (
                    <S.PaymentOption
                      key={pm.id}
                      selected={paymentMethod === pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                    >
                      <span className="pay-icon">{pm.icon}</span>
                      <span className="pay-title">{pm.name}</span>
                      <span className="pay-sub">{pm.sub}</span>
                    </S.PaymentOption>
                  ))}
                </S.PaymentGrid>
              </S.Section>

              {/* Gamified Coins Redemption */}
              {coins >= 250 && (
                <S.CoinRedemptionBox>
                  <div className="coin-info">
                    <span className="icon">🪙</span>
                    <div>
                      <strong>Redeem VibeCoins ({coins} Available)</strong>
                      <p>Use 250 coins to get ₹50 off this order</p>
                    </div>
                  </div>
                  <button
                    className={redeemCoins ? 'applied' : ''}
                    onClick={() => setRedeemCoins(!redeemCoins)}
                  >
                    {redeemCoins ? '✓ APPLIED (-₹50)' : 'APPLY COINS'}
                  </button>
                </S.CoinRedemptionBox>
              )}

              {/* Order Summary */}
              <S.Section>
                <div className="section-head">
                  <h4>🧾 3. Order Breakdown ({total.productQuantity} items)</h4>
                  <span>Estimated Delivery: Free</span>
                </div>
                <S.SummaryBreakdown>
                  <div className="row">
                    <span>Subtotal</span>
                    <span>
                      {total.currencyFormat}
                      {formatPrice(total.totalPrice, total.currencyId)}
                    </span>
                  </div>

                  {total.discountPrice && total.discountPrice < total.totalPrice && (
                    <div className="row discount">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>
                        - {total.currencyFormat}
                        {formatPrice(total.totalPrice - total.discountPrice, total.currencyId)}
                      </span>
                    </div>
                  )}

                  {coinDiscount > 0 && (
                    <div className="row discount">
                      <span>VibeCoins Discount</span>
                      <span>
                        - {total.currencyFormat}
                        {formatPrice(coinDiscount, total.currencyId)}
                      </span>
                    </div>
                  )}

                  <div className="row">
                    <span>Standard Carbon-Neutral Shipping</span>
                    <span style={{ color: '#00ff88', fontWeight: 700 }}>FREE</span>
                  </div>

                  <div className="row total">
                    <span>Total Due</span>
                    <span className="total-amount">
                      {total.currencyFormat}
                      {formatPrice(finalPrice, total.currencyId)}
                    </span>
                  </div>
                </S.SummaryBreakdown>
              </S.Section>
            </S.Body>

            <S.Footer>
              <div className="total-preview">
                <span>Final Total:</span>
                <strong>
                  {total.currencyFormat}
                  {formatPrice(finalPrice, total.currencyId)}
                </strong>
              </div>
              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={products.length === 0}
              >
                ⚡ PLACE ORDER NOW
              </button>
            </S.Footer>
          </>
        )}
      </S.Modal>
    </S.Overlay>
  );
};

export default CheckoutModal;
