import React, { useState } from 'react';
import { IProduct } from 'models';
import { useProducts } from 'contexts/products-context';
import { useCart } from 'contexts/cart-context';
import { useWishlist } from 'contexts/wishlist-context';
import { useUser } from 'contexts/user-context';
import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import * as S from './style';

type SectionKey =
  | 'trending'
  | 'viral'
  | 'stylish'
  | 'newArrivals'
  | 'bestSellers'
  | 'mostLoved'
  | 'mostPurchased';

interface ISectionMeta {
  key: SectionKey;
  title: string;
  badge: string;
  icon: string;
  description: string;
}

const SECTIONS: ISectionMeta[] = [
  {
    key: 'trending',
    title: 'Trending Products',
    badge: 'HOT THIS HOUR',
    icon: '🔥',
    description: 'High velocity streetwear styles spiking across our community.',
  },
  {
    key: 'viral',
    title: "What's Viral",
    badge: 'AS SEEN ON TIKTOK',
    icon: '⚡',
    description: 'The pieces blowing up on social feeds and moodboards right now.',
  },
  {
    key: 'stylish',
    title: 'Stylish Looks',
    badge: 'CURATED EDITORIAL',
    icon: '✨',
    description: 'Aesthetic silhouettes and layered fits hand-selected by our stylists.',
  },
  {
    key: 'newArrivals',
    title: 'New Arrivals',
    badge: 'JUST DROPPED',
    icon: '🚀',
    description: 'Fresh seasonal cuts, heavyweight fleeces, and new archive releases.',
  },
  {
    key: 'bestSellers',
    title: 'Best Sellers',
    badge: 'TOP RATED',
    icon: '⭐',
    description: 'Consistently 5-star reviewed pieces with over 98% satisfaction.',
  },
  {
    key: 'mostLoved',
    title: 'Most Loved',
    badge: 'COMMUNITY FAVORITES',
    icon: '💖',
    description: 'Most saved to wishlists and re-ordered essentials.',
  },
  {
    key: 'mostPurchased',
    title: 'Most Purchased This Week',
    badge: 'HIGH DEMAND',
    icon: '📈',
    description: 'Fast selling out: secure your size before the next restock drop.',
  },
];

const HomepageSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SectionKey>('trending');
  const {
    trendingProducts,
    viralProducts,
    stylishLooks,
    newArrivals,
    bestSellers,
    mostLoved,
    mostPurchased,
    setSelectedProductForDetail,
  } = useProducts();

  const { addProduct, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useUser();

  const getActiveProducts = (): IProduct[] => {
    switch (activeTab) {
      case 'trending':
        return trendingProducts;
      case 'viral':
        return viralProducts;
      case 'stylish':
        return stylishLooks;
      case 'newArrivals':
        return newArrivals;
      case 'bestSellers':
        return bestSellers;
      case 'mostLoved':
        return mostLoved;
      case 'mostPurchased':
        return mostPurchased;
      default:
        return trendingProducts;
    }
  };

  const activeMeta = SECTIONS.find((s) => s.key === activeTab) || SECTIONS[0];
  const items = getActiveProducts();

  const handleQuickAdd = (product: IProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes?.[0] || 'M';
    const defaultColor = product.colors?.[0]?.name || '';
    addProduct({
      ...product,
      quantity: 1,
      selectedSize: defaultSize,
      selectedColor: defaultColor,
    });
    showToast(`Added ${product.title} to bag!`, 'success', '🛍️');
    openCart();
  };

  return (
    <S.Container id="homepage-curated-sections">
      <S.HeaderWrapper>
        <S.SectionBadge>
          <span className="icon">{activeMeta.icon}</span>
          <span>{activeMeta.badge}</span>
        </S.SectionBadge>
        <S.Title>{activeMeta.title}</S.Title>
        <S.Description>{activeMeta.description}</S.Description>
      </S.HeaderWrapper>

      {/* Section Tab Selector */}
      <S.TabsTrack>
        {SECTIONS.map((section) => (
          <S.TabButton
            key={section.key}
            active={activeTab === section.key}
            onClick={() => setActiveTab(section.key)}
          >
            <span>{section.icon}</span>
            <span>{section.title}</span>
          </S.TabButton>
        ))}
      </S.TabsTrack>

      {/* Highlighted Showcase Slider */}
      <S.CarouselGrid>
        {items.slice(0, 4).map((product) => {
          const inWish = isInWishlist(product.sku);
          const imgSrc = getProductImage(product, 1);
          const hoverImgSrc = getProductImage(product, 2);

          return (
            <S.ShowcaseCard
              key={product.sku}
              onClick={() => setSelectedProductForDetail(product)}
            >
              <S.ImageContainer>
                <S.CardImage src={imgSrc} alt={product.title} />
                <S.HoverImage src={hoverImgSrc} alt={product.title} />

                {product.originalPrice && product.originalPrice > product.price && (
                  <S.DiscountTag>
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    %
                  </S.DiscountTag>
                )}

                <S.WishlistBtn
                  active={inWish}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <svg viewBox="0 0 24 24" fill={inWish ? '#ff3b30' : 'none'} stroke={inWish ? '#ff3b30' : 'currentColor'}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </S.WishlistBtn>

                <S.QuickViewBar>
                  <span>QUICK VIEW DETAILS</span>
                </S.QuickViewBar>
              </S.ImageContainer>

              <S.InfoWrapper>
                <S.CategoryStyle>
                  <span>{product.category || 'Streetwear'}</span>
                  <span>•</span>
                  <span>{product.style || 'Oversized'}</span>
                </S.CategoryStyle>

                <S.CardTitle>{product.title}</S.CardTitle>

                <S.RatingRow>
                  <span className="stars">★★★★★</span>
                  <span className="score">{product.rating || 4.9}</span>
                  <span className="reviews">({product.reviewsCount || 84})</span>
                </S.RatingRow>

                <S.PriceRow>
                  <div className="prices">
                    <span className="current">
                      {product.currencyFormat}
                      {formatPrice(product.price, product.currencyId)}
                    </span>
                    {product.originalPrice && (
                      <span className="original">
                        {product.currencyFormat}
                        {formatPrice(product.originalPrice, product.currencyId)}
                      </span>
                    )}
                  </div>

                  <S.AddBagButton
                    onClick={(e) => handleQuickAdd(product, e)}
                    title="Quick Add to Bag"
                  >
                    + BAG
                  </S.AddBagButton>
                </S.PriceRow>
              </S.InfoWrapper>
            </S.ShowcaseCard>
          );
        })}
      </S.CarouselGrid>
    </S.Container>
  );
};

export default HomepageSections;
