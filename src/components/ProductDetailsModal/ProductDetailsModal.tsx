import React, { useState, useEffect } from 'react';
import { useProducts } from 'contexts/products-context';
import { useCart } from 'contexts/cart-context';
import { useWishlist } from 'contexts/wishlist-context';
import { useUser } from 'contexts/user-context';
import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import * as S from './style';

const ProductDetailsModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    getSimilarProducts,
  } = useProducts();
  const { addProduct, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useUser();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping' | 'reviews'>('details');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProductForDetail) {
      setActiveImageIndex(0);
      setSelectedSize(selectedProductForDetail.availableSizes?.[0] || 'M');
      setSelectedColor(selectedProductForDetail.colors?.[0]?.name || '');
      setQuantity(1);
      setActiveTab('details');
      setAddedAnimation(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProductForDetail]);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const inWishlist = isInWishlist(product.sku);
  const similarProducts = getSimilarProducts(product);

  // Collect images
  const images = product.images && product.images.length > 0
    ? product.images
    : [
        getProductImage(product, 1),
        getProductImage(product, 2),
      ];

  const handleClose = () => {
    setSelectedProductForDetail(null);
  };

  const handleAddToCart = () => {
    setAddedAnimation(true);
    addProduct({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
    showToast(`Added ${quantity}x ${product.title} (${selectedSize}) to bag!`, 'success', '🛍️');
    setTimeout(() => {
      setAddedAnimation(false);
      openCart();
    }, 350);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null;

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={handleClose} title="Close details">
          ✕
        </S.CloseButton>

        <S.ModalGrid>
          {/* Left Column: Image Gallery */}
          <S.GalleryColumn>
            <S.MainImageWrapper>
              <S.MainImage
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
              />
              {discountPercent && (
                <S.BadgeTopLeft>-{discountPercent}% OFF</S.BadgeTopLeft>
              )}
              {product.isFreeShipping && (
                <S.BadgeTopRight>FREE EXPRESS SHIPPING</S.BadgeTopRight>
              )}
            </S.MainImageWrapper>

            {/* Thumbnails */}
            <S.ThumbnailsRow>
              {images.map((img, idx) => (
                <S.Thumbnail
                  key={idx}
                  active={idx === activeImageIndex}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`${product.title} preview ${idx + 1}`} />
                </S.Thumbnail>
              ))}
            </S.ThumbnailsRow>
          </S.GalleryColumn>

          {/* Right Column: Product Info & Actions */}
          <S.InfoColumn>
            <S.Breadcrumb>
              <span>{product.category || 'Streetwear'}</span>
              <span>/</span>
              <span>{product.style || 'Capsule'}</span>
              <span>/</span>
              <span>SKU: {product.sku}</span>
            </S.Breadcrumb>

            <S.Title>{product.title}</S.Title>

            <S.RatingReviewBar>
              <S.Stars>★★★★★</S.Stars>
              <S.RatingScore>{product.rating || 4.9}</S.RatingScore>
              <S.ReviewCount>
                ({product.reviewsCount || 120} verified customer reviews)
              </S.ReviewCount>
            </S.RatingReviewBar>

            <S.PriceBlock>
              <S.CurrentPrice>
                {product.currencyFormat}
                {formatPrice(product.price, product.currencyId)}
              </S.CurrentPrice>
              {product.originalPrice && (
                <S.OriginalPrice>
                  {product.currencyFormat}
                  {formatPrice(product.originalPrice, product.currencyId)}
                </S.OriginalPrice>
              )}
              {discountPercent && (
                <S.SavingsPill>Save {discountPercent}%</S.SavingsPill>
              )}
            </S.PriceBlock>

            {product.installments > 0 && (
              <S.InstallmentText>
                ⚡ Or pay in {product.installments} monthly installments of{' '}
                <b>
                  {product.currencyFormat}
                  {formatPrice(
                    product.price / product.installments,
                    product.currencyId
                  )}
                </b>{' '}
                with 0% interest.
              </S.InstallmentText>
            )}

            <S.ShortDescription>
              {product.description || product.longDescription}
            </S.ShortDescription>

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <S.OptionSection>
                <S.OptionHeader>
                  <span>COLOR:</span>
                  <b>{selectedColor || product.colors[0].name}</b>
                </S.OptionHeader>
                <S.ColorSwatches>
                  {product.colors.map((color) => (
                    <S.ColorSwatch
                      key={color.name}
                      colorHex={color.hex}
                      active={selectedColor === color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </S.ColorSwatches>
              </S.OptionSection>
            )}

            {/* Size Variant Selection */}
            <S.OptionSection>
              <S.OptionHeader>
                <span>SELECT SIZE:</span>
                <S.SizeGuideLink>Fit Guide</S.SizeGuideLink>
              </S.OptionHeader>
              <S.SizesGrid>
                {product.availableSizes?.map((size) => (
                  <S.SizePill
                    key={size}
                    active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </S.SizePill>
                ))}
              </S.SizesGrid>
            </S.OptionSection>

            {/* Quantity and Actions */}
            <S.ActionRow>
              <S.QuantityControl>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </S.QuantityControl>

              <S.AddToCartButton
                onClick={handleAddToCart}
                added={addedAnimation}
              >
                {addedAnimation ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
              </S.AddToCartButton>

              <S.WishlistIconButton
                active={inWishlist}
                onClick={() => toggleWishlist(product)}
                title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <svg viewBox="0 0 24 24" fill={inWishlist ? '#ff3b30' : 'none'} stroke={inWishlist ? '#ff3b30' : 'currentColor'}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </S.WishlistIconButton>
            </S.ActionRow>

            {/* Stock indicator */}
            <S.StockStatus>
              <span className="dot" />
              <span>In Stock — Usually dispatches in 24 hours</span>
            </S.StockStatus>

            {/* Accordion Tabs */}
            <S.TabNav>
              <S.TabTitle
                active={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
              >
                Details & Fit
              </S.TabTitle>
              <S.TabTitle
                active={activeTab === 'care'}
                onClick={() => setActiveTab('care')}
              >
                Fabric & Care
              </S.TabTitle>
              <S.TabTitle
                active={activeTab === 'shipping'}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Returns
              </S.TabTitle>
              <S.TabTitle
                active={activeTab === 'reviews'}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews?.length || 2})
              </S.TabTitle>
            </S.TabNav>

            <S.TabContentWrapper>
              {activeTab === 'details' && (
                <S.TabParagraph>
                  {product.longDescription || product.description}
                  <br />
                  <br />
                  • Silhouette: Boxy drop-shoulder cut with reinforced double-stitch ribbing.
                  <br />
                  • Fit recommendation: Fits true to oversized streetwear proportions.
                </S.TabParagraph>
              )}

              {activeTab === 'care' && (
                <S.TabParagraph>
                  Crafted from 100% GOTS-certified heavyweight organic cotton (280–450 GSM).
                  <br />
                  <br />
                  • Machine wash cold (30°C) with like colors.
                  <br />
                  • Turn garment inside out to preserve graphics and wash tone.
                  <br />
                  • Tumble dry low or hang dry for longevity.
                </S.TabParagraph>
              )}

              {activeTab === 'shipping' && (
                <S.TabParagraph>
                  • <b>Free Express Shipping:</b> On all orders over $50 worldwide.
                  <br />
                  • <b>Dispatch:</b> Orders placed before 2 PM EST ship same day.
                  <br />
                  • <b>Hassle-Free Returns:</b> 30-day return policy for exchange or full refund.
                </S.TabParagraph>
              )}

              {activeTab === 'reviews' && (
                <S.ReviewsList>
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <S.ReviewCard key={rev.id}>
                        <S.ReviewHeader>
                          <strong>{rev.author}</strong>
                          {rev.verifiedPurchase && (
                            <S.VerifiedPill>Verified Buyer</S.VerifiedPill>
                          )}
                          <span className="date">{rev.date}</span>
                        </S.ReviewHeader>
                        <S.ReviewRating>{'★'.repeat(rev.rating)}</S.ReviewRating>
                        <S.ReviewComment>{rev.comment}</S.ReviewComment>
                      </S.ReviewCard>
                    ))
                  ) : (
                    <S.ReviewCard>
                      <S.ReviewHeader>
                        <strong>Alex R.</strong>
                        <S.VerifiedPill>Verified Buyer</S.VerifiedPill>
                        <span className="date">3 days ago</span>
                      </S.ReviewHeader>
                      <S.ReviewRating>★★★★★</S.ReviewRating>
                      <S.ReviewComment>
                        The fit and quality exceeded expectations. Exactly like the editorial photos.
                      </S.ReviewComment>
                    </S.ReviewCard>
                  )}
                </S.ReviewsList>
              )}
            </S.TabContentWrapper>
          </S.InfoColumn>
        </S.ModalGrid>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <S.SimilarSection>
            <S.SimilarTitle>SIMILAR STREETWEAR SILHOUETTES</S.SimilarTitle>
            <S.SimilarGrid>
              {similarProducts.map((sim) => (
                <S.SimilarCard
                  key={sim.sku}
                  onClick={() => setSelectedProductForDetail(sim)}
                >
                  <img src={getProductImage(sim, 1, true)} alt={sim.title} />
                  <div className="meta">
                    <strong>{sim.title}</strong>
                    <span>
                      {sim.currencyFormat}
                      {formatPrice(sim.price, sim.currencyId)}
                    </span>
                  </div>
                </S.SimilarCard>
              ))}
            </S.SimilarGrid>
          </S.SimilarSection>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ProductDetailsModal;
