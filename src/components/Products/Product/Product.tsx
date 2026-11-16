import { KeyboardEvent, useState } from 'react';
import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import { IProduct } from 'models';
import { useCart } from 'contexts/cart-context';
import { useWishlist } from 'contexts/wishlist-context';
import { useProducts } from 'contexts/products-context';
import { useUser } from 'contexts/user-context';
import * as S from './style';

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const { openCart, addProduct } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { setSelectedProductForDetail } = useProducts();
  const { showToast } = useUser();

  const {
    sku,
    title,
    price,
    originalPrice,
    installments,
    currencyId,
    currencyFormat,
    isFreeShipping,
    category,
    style,
    availableSizes,
    colors,
    rating,
    reviewsCount,
  } = product;

  const inWishlist = isInWishlist(sku);
  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes && availableSizes.length > 0 ? availableSizes[0] : 'M'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    colors && colors.length > 0 ? colors[0].name : ''
  );

  const formattedPrice = formatPrice(price, currencyId);

  let productInstallment;
  if (installments) {
    const installmentPrice = price / installments;
    productInstallment = (
      <S.Installment>
        <span>or {installments} x</span>
        <b>
          {currencyFormat}
          {formatPrice(installmentPrice, currencyId)}
        </b>
      </S.Installment>
    );
  }

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const handleAddProduct = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addProduct({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });
    showToast(`Added ${title} (${selectedSize}) to bag!`, 'success', '🛍️');
    openCart();
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      addProduct({
        ...product,
        quantity: 1,
        selectedSize,
        selectedColor,
      });
      showToast(`Added ${title} (${selectedSize}) to bag!`, 'success', '🛍️');
      openCart();
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductForDetail(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      inWishlist ? `Removed ${title} from wishlist` : `Saved ${title} to wishlist!`,
      inWishlist ? 'info' : 'reward',
      inWishlist ? '💔' : '💖'
    );
  };

  const mainImg = getProductImage(product, 1);
  const hoverImg = getProductImage(product, 2);

  return (
    <S.Container
      onKeyUp={handleAddProductWhenEnter}
      sku={sku}
      tabIndex={1}
      onClick={handleQuickView}
    >
      {/* Top Badges */}
      <S.BadgeContainer>
        {isFreeShipping && <S.Stopper>Free shipping</S.Stopper>}
        {discountPercent && <S.DiscountBadge>-{discountPercent}%</S.DiscountBadge>}
      </S.BadgeContainer>

      {/* Wishlist Button */}
      <S.WishlistButton
        active={inWishlist}
        onClick={handleWishlistClick}
        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        <svg viewBox="0 0 24 24" fill={inWishlist ? '#ff3b30' : 'none'} stroke={inWishlist ? '#ff3b30' : 'currentColor'}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </S.WishlistButton>

      {/* Product Image with dual hover flip */}
      <S.ImageContainer>
        <S.MainImg src={mainImg} alt={title} />
        <S.HoverImg src={hoverImg} alt={`${title} alternate`} />
        <S.QuickViewOverlay onClick={handleQuickView}>
          <span>QUICK VIEW</span>
        </S.QuickViewOverlay>
      </S.ImageContainer>

      {/* Meta: Category & Style */}
      <S.MetaRow>
        <span>{category || 'Streetwear'}</span>
        {style && (
          <>
            <span>•</span>
            <span>{style}</span>
          </>
        )}
      </S.MetaRow>

      <S.Title>{title}</S.Title>

      {/* Star Rating */}
      <S.RatingRow>
        <span className="stars">★★★★★</span>
        <span className="score">{rating || 4.8}</span>
        <span className="reviews">({reviewsCount || 48})</span>
      </S.RatingRow>

      {/* Color Variant Preview Swatches */}
      {colors && colors.length > 0 && (
        <S.ColorRow onClick={(e) => e.stopPropagation()}>
          {colors.map((c) => (
            <S.ColorDot
              key={c.name}
              color={c.hex}
              active={selectedColor === c.name}
              onClick={() => setSelectedColor(c.name)}
              title={c.name}
            />
          ))}
        </S.ColorRow>
      )}

      {/* Size Variant Selector Pills */}
      {availableSizes && availableSizes.length > 0 && (
        <S.SizesRow onClick={(e) => e.stopPropagation()}>
          {availableSizes.map((size) => (
            <S.SizeButton
              key={size}
              active={selectedSize === size}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </S.SizeButton>
          ))}
        </S.SizesRow>
      )}

      {/* Price Block */}
      <S.Price>
        <S.Val>
          <small>{currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
          {originalPrice && originalPrice > price && (
            <S.OriginalPriceStrike>
              {currencyFormat}
              {formatPrice(originalPrice, currencyId)}
            </S.OriginalPriceStrike>
          )}
        </S.Val>
        {productInstallment}
      </S.Price>

      <S.BuyButton onClick={handleAddProduct} tabIndex={-1}>
        Add to cart
      </S.BuyButton>
    </S.Container>
  );
};

export default Product;
