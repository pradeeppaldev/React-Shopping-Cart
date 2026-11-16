import { createContext, useContext, FC, useState, useEffect } from 'react';
import { ICartProduct, ICartTotal } from 'models';

export interface ICartContext {
  isOpen: boolean;
  setIsOpen(state: boolean): void;
  products: ICartProduct[];
  setProducts(products: ICartProduct[]): void;
  total: ICartTotal;
  setTotal(total: ICartTotal): void;
  appliedPromo: string;
  setAppliedPromo(code: string): void;
  promoDiscountPercent: number;
  setPromoDiscountPercent(percent: number): void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);
const useCartContext = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

const totalInitialValues: ICartTotal = {
  productQuantity: 0,
  installments: 0,
  totalPrice: 0,
  currencyId: 'USD',
  currencyFormat: '$',
  discountPrice: 0,
};

const CartProvider: FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string>(() => {
    try {
      return localStorage.getItem('vibe_promo_code') || '';
    } catch {
      return '';
    }
  });
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vibe_promo_discount');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [products, setProducts] = useState<ICartProduct[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_cart_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [total, setTotal] = useState<ICartTotal>(() => {
    try {
      const saved = localStorage.getItem('vibe_cart_total');
      return saved ? JSON.parse(saved) : totalInitialValues;
    } catch {
      return totalInitialValues;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vibe_cart_products', JSON.stringify(products));
    } catch {
      // storage unavailable
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('vibe_cart_total', JSON.stringify(total));
    } catch {
      // storage unavailable
    }
  }, [total]);

  useEffect(() => {
    try {
      localStorage.setItem('vibe_promo_code', appliedPromo);
      localStorage.setItem('vibe_promo_discount', String(promoDiscountPercent));
    } catch {
      // storage unavailable
    }
  }, [appliedPromo, promoDiscountPercent]);

  const CartContextValue: ICartContext = {
    isOpen,
    setIsOpen,
    products,
    setProducts,
    total,
    setTotal,
    appliedPromo,
    setAppliedPromo,
    promoDiscountPercent,
    setPromoDiscountPercent,
  };

  return <CartContext.Provider value={CartContextValue} {...props} />;
};

export { CartProvider, useCartContext };
