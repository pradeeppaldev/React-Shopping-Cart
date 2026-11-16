import { useState } from 'react';
import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';
import { useCart } from 'contexts/cart-context';
import { useUser } from 'contexts/user-context';
import * as S from './style';

const FREE_SHIPPING_THRESHOLD = 50.0;

const Cart = () => {
  const {
    products,
    total,
    isOpen,
    openCart,
    closeCart,
    appliedPromo,
    setAppliedPromo,
    promoDiscountPercent,
    setPromoDiscountPercent,
  } = useCart();

  const { openCheckout } = useUser();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleCheckout = () => {
    if (total.productQuantity) {
      openCheckout();
    } else {
      alert('Add some product in the cart!');
    }
  };

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'WELCOME200') {
      setAppliedPromo(cleanCode);
      setPromoDiscountPercent(20);
      setPromoMessage({
        text: '🎉 WELCOME DISCOUNT APPLIED: ₹200 OFF!',
        type: 'success',
      });
      setPromoInput('');
    } else if (cleanCode === 'VIBE20' || cleanCode === 'GENZ20') {
      setAppliedPromo(cleanCode);
      setPromoDiscountPercent(20);
      setPromoMessage({
        text: '🔥 20% DISCOUNT APPLIED!',
        type: 'success',
      });
      setPromoInput('');
    } else if (cleanCode === 'SPIN25' || cleanCode === 'BDAY25') {
      setAppliedPromo(cleanCode);
      setPromoDiscountPercent(25);
      setPromoMessage({
        text: '👑 25% VIP PERK APPLIED!',
        type: 'success',
      });
      setPromoInput('');
    } else if (cleanCode === 'COIN100' || cleanCode === 'COIN250' || cleanCode === 'COIN500' || cleanCode === 'FESTIVE300') {
      setAppliedPromo(cleanCode);
      setPromoDiscountPercent(15);
      setPromoMessage({
        text: `✨ REDEEMED CODE ${cleanCode} APPLIED!`,
        type: 'success',
      });
      setPromoInput('');
    } else if (cleanCode === 'FREESHIP') {
      setAppliedPromo(cleanCode);
      setPromoDiscountPercent(10);
      setPromoMessage({
        text: '✨ FREE SHIPPING PASS APPLIED!',
        type: 'success',
      });
      setPromoInput('');
    } else {
      setPromoMessage({
        text: 'Invalid code. Try "WELCOME200" or "VIBE20"',
        type: 'error',
      });
    }
  };

  const amountNeeded = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - (total.totalPrice || 0)
  );
  const progressPercent = Math.min(
    100,
    ((total.totalPrice || 0) / FREE_SHIPPING_THRESHOLD) * 100
  );

  return (
    <>
      {isOpen && <S.BackdropOverlay onClick={closeCart} />}
      <S.Container isOpen={isOpen}>
        <S.CartButton onClick={handleToggleCart(isOpen)} aria-label="Toggle cart">
          {isOpen ? (
            <span>✕</span>
          ) : (
            <S.CartIcon>
              <S.CartQuantity title="Products in cart quantity">
                {total.productQuantity}
              </S.CartQuantity>
            </S.CartIcon>
          )}
        </S.CartButton>

        {isOpen && (
          <S.CartContent>
            <S.CartContentHeader>
              <S.CartIcon large>
                <S.CartQuantity>{total.productQuantity}</S.CartQuantity>
              </S.CartIcon>
              <S.HeaderTitle>Your Bag ({total.productQuantity})</S.HeaderTitle>
            </S.CartContentHeader>

            {/* Free Shipping Tier Bar */}
            <S.ShippingBarContainer>
              <S.ShippingBarLabel>
                {amountNeeded > 0 ? (
                  <>
                    🚚 Add{' '}
                    <b>
                      {total.currencyFormat}
                      {formatPrice(amountNeeded, total.currencyId)}
                    </b>{' '}
                    more for <b>FREE EXPRESS SHIPPING</b>
                  </>
                ) : (
                  <>🎉 You unlocked <b>FREE EXPRESS SHIPPING!</b></>
                )}
              </S.ShippingBarLabel>
              <S.ProgressBarTrack>
                <S.ProgressBarFill progress={progressPercent} />
              </S.ProgressBarTrack>
            </S.ShippingBarContainer>

            {/* Products in Cart */}
            <CartProducts products={products} />

            {/* Promo Code Form */}
            <S.PromoContainer onSubmit={handleApplyPromo}>
              <S.PromoInput
                type="text"
                placeholder="PROMO CODE (e.g. VIBE20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <S.PromoButton type="submit">APPLY</S.PromoButton>
            </S.PromoContainer>

            {promoMessage && (
              <S.PromoMessage type={promoMessage.type}>
                {promoMessage.text}
              </S.PromoMessage>
            )}

            {appliedPromo && (
              <S.ActivePromoBadge>
                <span>CODE {appliedPromo} ACTIVE (-{promoDiscountPercent}%)</span>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedPromo('');
                    setPromoDiscountPercent(0);
                    setPromoMessage(null);
                  }}
                >
                  ✕
                </button>
              </S.ActivePromoBadge>
            )}

            <S.CartFooter>
              <S.SummaryRow>
                <S.Sub>SUBTOTAL</S.Sub>
                <S.SubPrice>
                  <S.SubPriceValue>{`${total.currencyFormat} ${formatPrice(
                    total.totalPrice,
                    total.currencyId
                  )}`}</S.SubPriceValue>
                  <S.SubPriceInstallment>
                    {total.installments ? (
                      <span>
                        {`OR UP TO ${total.installments} x ${
                          total.currencyFormat
                        } ${formatPrice(
                          total.totalPrice / total.installments,
                          total.currencyId
                        )}`}
                      </span>
                    ) : null}
                  </S.SubPriceInstallment>
                </S.SubPrice>
              </S.SummaryRow>

              <S.CheckoutButton onClick={handleCheckout} autoFocus>
                🔒 SECURE CHECKOUT
              </S.CheckoutButton>

              <S.TrustBadgesRow>
                <span>✓ 30-Day Free Returns</span>
                <span>•</span>
                <span>✓ Encrypted Checkout</span>
              </S.TrustBadgesRow>
            </S.CartFooter>
          </S.CartContent>
        )}
      </S.Container>
    </>
  );
};

export default Cart;
