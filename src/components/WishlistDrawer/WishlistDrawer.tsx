import React from 'react';
import { useWishlist } from 'contexts/wishlist-context';
import { useCart } from 'contexts/cart-context';
import { IProduct } from 'models';
import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import * as S from './style';

const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } =
    useWishlist();
  const { addProduct, openCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product: IProduct) => {
    const size = product.availableSizes?.[0] || 'M';
    const color = product.colors?.[0]?.name || '';
    addProduct({
      ...product,
      quantity: 1,
      selectedSize: size,
      selectedColor: color,
    });
    removeFromWishlist(product.sku);
    openCart();
  };

  return (
    <S.Overlay onClick={() => setIsWishlistOpen(false)}>
      <S.DrawerContainer onClick={(e) => e.stopPropagation()}>
        <S.DrawerHeader>
          <S.HeaderTitle>
            <S.HeartIcon viewBox="0 0 24 24" fill="#ff3b30">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </S.HeartIcon>
            <span>SAVED ITEMS ({wishlist.length})</span>
          </S.HeaderTitle>
          <S.CloseButton onClick={() => setIsWishlistOpen(false)}>✕</S.CloseButton>
        </S.DrawerHeader>

        {wishlist.length === 0 ? (
          <S.EmptyState>
            <span className="heart-emoji">💔</span>
            <h3>YOUR WISHLIST IS EMPTY</h3>
            <p>Save pieces you vibe with to keep track of restocks and price drops.</p>
            <S.ExploreButton onClick={() => setIsWishlistOpen(false)}>
              EXPLORE DROPS
            </S.ExploreButton>
          </S.EmptyState>
        ) : (
          <S.ItemsList>
            {wishlist.map((item) => (
              <S.ItemCard key={item.sku}>
                <S.ItemImage
                  src={getProductImage(item, 1, true)}
                  alt={item.title}
                />
                <S.ItemDetails>
                  <S.ItemCategory>{item.category || 'Streetwear'}</S.ItemCategory>
                  <S.ItemTitle>{item.title}</S.ItemTitle>
                  <S.ItemPrice>
                    {item.currencyFormat}
                    {formatPrice(item.price, item.currencyId)}
                  </S.ItemPrice>
                  <S.ItemActions>
                    <S.MoveToCartButton onClick={() => handleMoveToCart(item)}>
                      + MOVE TO BAG
                    </S.MoveToCartButton>
                    <S.RemoveButton onClick={() => removeFromWishlist(item.sku)}>
                      REMOVE
                    </S.RemoveButton>
                  </S.ItemActions>
                </S.ItemDetails>
              </S.ItemCard>
            ))}
          </S.ItemsList>
        )}
      </S.DrawerContainer>
    </S.Overlay>
  );
};

export default WishlistDrawer;
