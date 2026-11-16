import React, {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { IProduct } from 'models';

export interface IWishlistContext {
  wishlist: IProduct[];
  wishlistCount: number;
  isInWishlist: (sku: number) => boolean;
  toggleWishlist: (product: IProduct) => void;
  removeFromWishlist: (sku: number) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const WishlistContext = createContext<IWishlistContext | undefined>(undefined);

export const useWishlist = (): IWishlistContext => {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      wishlist: [],
      wishlistCount: 0,
      isInWishlist: () => false,
      toggleWishlist: () => {},
      removeFromWishlist: () => {},
      isWishlistOpen: false,
      setIsWishlistOpen: () => {},
    };
  }
  return context;
};

export const WishlistProvider: FC = ({ children }) => {
  const [wishlist, setWishlist] = useState<IProduct[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_wishlist_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vibe_wishlist_items', JSON.stringify(wishlist));
    } catch {
      // safe storage fallback
    }
  }, [wishlist]);

  const isInWishlist = useCallback(
    (sku: number) => {
      return wishlist.some((item) => item.sku === sku);
    },
    [wishlist]
  );

  const toggleWishlist = useCallback((product: IProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.sku === product.sku);
      if (exists) {
        return prev.filter((item) => item.sku !== product.sku);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  const removeFromWishlist = useCallback((sku: number) => {
    setWishlist((prev) => prev.filter((item) => item.sku !== sku));
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
