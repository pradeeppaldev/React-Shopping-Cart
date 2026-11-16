import { useCartContext } from './CartContextProvider';
import { ICartProduct, ICartTotal } from 'models';

const useCartTotal = () => {
  const { total, setTotal, promoDiscountPercent, appliedPromo } = useCartContext();

  const updateCartTotal = (products: ICartProduct[]) => {
    const productQuantity = products.reduce(
      (sum: number, product: ICartProduct) => {
        sum += product.quantity;
        return sum;
      },
      0
    );

    const subtotal = products.reduce((sum: number, product: ICartProduct) => {
      sum += product.price * product.quantity;
      return sum;
    }, 0);

    const discountRate = (promoDiscountPercent || 0) / 100;
    const discountPrice = Number((subtotal * discountRate).toFixed(2));
    const totalPrice = Number((subtotal - discountPrice).toFixed(2));

    const installments = products.reduce(
      (greater: number, product: ICartProduct) => {
        greater =
          product.installments > greater ? product.installments : greater;
        return greater;
      },
      0
    );

    const updatedTotal: ICartTotal = {
      productQuantity,
      installments,
      totalPrice,
      currencyId: 'USD',
      currencyFormat: '$',
    };

    if (discountPrice > 0) {
      updatedTotal.discountPrice = discountPrice;
    }
    if (appliedPromo) {
      updatedTotal.appliedPromo = appliedPromo;
    }

    setTotal(updatedTotal);
  };

  return {
    total,
    updateCartTotal,
  };
};

export default useCartTotal;
