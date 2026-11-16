import React, { useState, useEffect } from 'react';
import { useProducts } from 'contexts/products-context';
import { useCart } from 'contexts/cart-context';
import { useWishlist } from 'contexts/wishlist-context';
import { useUser } from 'contexts/user-context';
import { MoodType, OccasionType, DealType, IProduct } from 'models';
import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import * as S from './style';

const MOODS: { name: MoodType; emoji: string; desc: string }[] = [
  { name: 'Streetwear', emoji: '🛹', desc: 'Oversized, heavyweights & drop shoulders' },
  { name: 'Aesthetic', emoji: '🌸', desc: 'Pastels, vintage wash & soft drapes' },
  { name: 'Party Mode', emoji: '🪩', desc: 'Sheer mesh, chrome & statement silhouettes' },
  { name: 'Bold', emoji: '🔥', desc: 'Cyber graphics, gothic typography & acid washes' },
  { name: 'Minimal', emoji: '🖤', desc: 'Clean lines, monochromatic luxury & pima cotton' },
  { name: 'Casual', emoji: '☕', desc: 'Easy-wearing daily beaters & boxy tees' },
  { name: 'Sporty', emoji: '⚡', desc: 'Track striping, high-rebound runners & dunks' },
  { name: 'Chill', emoji: '☁️', desc: 'Cozy French Terry fleece & relaxed volume' },
];

const OCCASIONS: { name: OccasionType; emoji: string; outfitIdea: string }[] = [
  { name: 'College Fests', emoji: '🎸', outfitIdea: 'Parachute Cargos + Heavy Tee + Dunks' },
  { name: 'Birthday Parties', emoji: '🎂', outfitIdea: 'Cropped Bomber + Cyber Runner + Pearl Chain' },
  { name: 'Date Nights', emoji: '🕯️', outfitIdea: 'Cabernet Shirt + Lug Boots + Minimal Ring' },
  { name: 'Weddings', emoji: '💍', outfitIdea: 'Tailored Obsidian Pima Tee + Layered Blazer' },
  { name: 'Farewell', emoji: '🎓', outfitIdea: 'Sheer Layering Top + Vintage Wide Pants' },
  { name: 'Vacations', emoji: '🌴', outfitIdea: 'Camp Collar Jacquard + Denim Heavy Tote' },
  { name: 'Festivals', emoji: '🎪', outfitIdea: 'Cyber Runners + Y2K Shield Shades + Cargo Bag' },
  { name: 'Casual Outings', emoji: '🛹', outfitIdea: 'Heavy French Terry Sweatshirt + Dad Cap' },
];

const DEALS: { name: DealType; badge: string; color: string; desc: string }[] = [
  { name: "Today's Deals", badge: 'FLASH 24H', color: '#ff3b30', desc: 'Up to 50% off select viral silhouettes today only' },
  { name: 'Exclusive Offers', badge: 'VIP DROP', color: '#eabf00', desc: 'Member exclusive pricing on high-rotation staples' },
  { name: 'Combo Offers', badge: 'BUY 2 SAVE 25%', color: '#ccff00', desc: 'Mix & match tees, cargos, and footwear for extra savings' },
  { name: 'Limited-Time Deals', badge: 'ENDING SOON', color: '#ec4899', desc: 'Countdown active: prices go back up once timer expires' },
  { name: 'First-Time Buyer Discounts', badge: 'EXTRA ₹200 OFF', color: '#10b981', desc: 'Use code FIRST200 at checkout on orders above ₹999' },
];

const BUDGET_PRESETS = [
  { key: 'all', label: 'All Budgets', maxPrice: null },
  { key: 'under-299', label: 'Under ₹299', maxPrice: 299 },
  { key: 'under-499', label: 'Under ₹499', maxPrice: 499 },
  { key: 'under-999', label: 'Under ₹999', maxPrice: 999 },
  { key: 'under-1499', label: 'Under ₹1499', maxPrice: 1499 },
  { key: 'premium', label: 'Premium (₹1500+)', maxPrice: null },
];

const SmartDiscovery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'budget' | 'mood' | 'occasion' | 'deals' | 'pricedrop' | 'popularity' | 'personalized'
  >('budget');

  const {
    budgetFilter,
    updateBudgetFilter,
    customMinPrice,
    customMaxPrice,
    updateCustomPriceRange,
    moodFilter,
    updateMoodFilter,
    occasionFilter,
    updateOccasionFilter,
    dealFilter,
    updateDealFilter,
    priceDropProducts,
    mostPurchasedThisWeek,
    bestSellers,
    trendingAmongCustomers,
    communityFavorites,
    recentlyViewed,
    recommendedForYou,
    personalizedDeals,
    setSelectedProductForDetail,
  } = useProducts();

  const { addProduct, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useUser();

  // Local Min/Max inputs state
  const [minInput, setMinInput] = useState(customMinPrice);
  const [maxInput, setMaxInput] = useState(customMaxPrice);

  // Countdown timer for Limited-Time Deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomPriceRange(minInput, maxInput);
  };

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
    <S.DiscoverySection id="smart-discovery-section">
      <S.SectionHeader>
        <S.SectionBadge>⚡ SMART DISCOVERY ENGINE</S.SectionBadge>
        <S.Title>SHOP YOUR WAY // CURATED VIBES</S.Title>
        <S.Subtitle>
          Personalize by your budget, energy, event, or snag limited-time flash drops.
        </S.Subtitle>
      </S.SectionHeader>

      {/* Main Mode Navigation Tabs */}
      <S.NavigationTabs>
        <S.NavTabButton
          active={activeTab === 'budget'}
          onClick={() => setActiveTab('budget')}
        >
          <span>💰</span>
          <span>Shop by Budget</span>
        </S.NavTabButton>

        <S.NavTabButton
          active={activeTab === 'mood'}
          onClick={() => setActiveTab('mood')}
        >
          <span>🎭</span>
          <span>Shop by Mood</span>
        </S.NavTabButton>

        <S.NavTabButton
          active={activeTab === 'occasion'}
          onClick={() => setActiveTab('occasion')}
        >
          <span>🥂</span>
          <span>Shop by Occasion</span>
        </S.NavTabButton>

        <S.NavTabButton
          active={activeTab === 'deals'}
          onClick={() => setActiveTab('deals')}
        >
          <span>⚡</span>
          <span>Offers & Deals</span>
        </S.NavTabButton>

        <S.NavTabButton
          active={activeTab === 'pricedrop'}
          onClick={() => setActiveTab('pricedrop')}
        >
          <span>📉</span>
          <span>Price Drops ({priceDropProducts.length})</span>
        </S.NavTabButton>

        <S.NavTabButton
          active={activeTab === 'popularity'}
          onClick={() => setActiveTab('popularity')}
        >
          <span>👑</span>
          <span>Popularity</span>
        </S.NavTabButton>

        <S.NavTabButton
          active={activeTab === 'personalized'}
          onClick={() => setActiveTab('personalized')}
        >
          <span>✨</span>
          <span>For You ({recommendedForYou.length})</span>
        </S.NavTabButton>
      </S.NavigationTabs>

      {/* TAB 1: SHOP BY BUDGET */}
      {activeTab === 'budget' && (
        <S.TabPanel>
          <S.PanelHeader>
            <h3>FIND YOUR DRIP WITHIN BUDGET</h3>
            <p>Pick a predefined price bracket or set your exact minimum & maximum range.</p>
          </S.PanelHeader>

          <S.PillsGrid>
            {BUDGET_PRESETS.map((preset) => (
              <S.BudgetPill
                key={preset.key}
                active={budgetFilter === preset.key}
                onClick={() => updateBudgetFilter(preset.key)}
              >
                <strong>{preset.label}</strong>
              </S.BudgetPill>
            ))}
          </S.PillsGrid>

          {/* Custom Min / Max Price Filter */}
          <S.CustomPriceForm onSubmit={handleCustomPriceSubmit}>
            <span className="label">Custom Range:</span>
            <div className="input-group">
              <span className="currency">₹</span>
              <input
                type="number"
                placeholder="Min"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                min="0"
              />
            </div>
            <span className="to">to</span>
            <div className="input-group">
              <span className="currency">₹</span>
              <input
                type="number"
                placeholder="Max"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                min="0"
              />
            </div>
            <S.ApplyButton type="submit">FILTER PRICE</S.ApplyButton>
            {(minInput || maxInput || budgetFilter !== 'all') && (
              <S.ResetFilterButton
                type="button"
                onClick={() => {
                  setMinInput('');
                  setMaxInput('');
                  updateBudgetFilter('all');
                }}
              >
                Reset
              </S.ResetFilterButton>
            )}
          </S.CustomPriceForm>
        </S.TabPanel>
      )}

      {/* TAB 2: SHOP BY MOOD */}
      {activeTab === 'mood' && (
        <S.TabPanel>
          <S.PanelHeader>
            <h3>WHAT'S YOUR MOOD TODAY?</h3>
            <p>From laid-back oversized comfort to bold cyber rave statements.</p>
          </S.PanelHeader>

          <S.MoodGrid>
            <S.MoodCard
              active={moodFilter === 'All'}
              onClick={() => updateMoodFilter('All')}
            >
              <span className="emoji">🌈</span>
              <h4>All Moods</h4>
              <p>Explore all energies and aesthetics</p>
            </S.MoodCard>

            {MOODS.map((mood) => (
              <S.MoodCard
                key={mood.name}
                active={moodFilter.toLowerCase() === mood.name.toLowerCase()}
                onClick={() => updateMoodFilter(mood.name)}
              >
                <span className="emoji">{mood.emoji}</span>
                <h4>{mood.name}</h4>
                <p>{mood.desc}</p>
              </S.MoodCard>
            ))}
          </S.MoodGrid>
        </S.TabPanel>
      )}

      {/* TAB 3: SHOP BY OCCASION */}
      {activeTab === 'occasion' && (
        <S.TabPanel>
          <S.PanelHeader>
            <h3>CURATED OUTFITS BY OCCASION</h3>
            <p>Pre-styled streetwear fits designed to turn heads at any event.</p>
          </S.PanelHeader>

          <S.OccasionGrid>
            <S.OccasionCard
              active={occasionFilter === 'All'}
              onClick={() => updateOccasionFilter('All')}
            >
              <span className="emoji">✨</span>
              <div className="text">
                <h4>All Occasions</h4>
                <p>Complete wardrobe rotation</p>
              </div>
            </S.OccasionCard>

            {OCCASIONS.map((occ) => (
              <S.OccasionCard
                key={occ.name}
                active={occasionFilter.toLowerCase() === occ.name.toLowerCase()}
                onClick={() => updateOccasionFilter(occ.name)}
              >
                <span className="emoji">{occ.emoji}</span>
                <div className="text">
                  <h4>{occ.name}</h4>
                  <p className="outfit">
                    <b>Stylist Pick:</b> {occ.outfitIdea}
                  </p>
                </div>
              </S.OccasionCard>
            ))}
          </S.OccasionGrid>
        </S.TabPanel>
      )}

      {/* TAB 4: OFFERS & DEALS */}
      {activeTab === 'deals' && (
        <S.TabPanel>
          {/* Flash Promo Banner with Countdown Timer */}
          <S.DealsBanner>
            <div className="left">
              <span className="badge">🔥 LIMITED DROP ALERT</span>
              <h3>FLASH OFFERS ENDING SOON</h3>
              <p>Extra 20% off with promo code <b>VIBE20</b> at checkout!</p>
            </div>
            <S.CountdownBox>
              <div className="time-block">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <small>HRS</small>
              </div>
              <span className="colon">:</span>
              <div className="time-block">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <small>MIN</small>
              </div>
              <span className="colon">:</span>
              <div className="time-block">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <small>SEC</small>
              </div>
            </S.CountdownBox>
          </S.DealsBanner>

          <S.DealsSelectorGrid>
            <S.DealPill
              active={dealFilter === 'All'}
              onClick={() => updateDealFilter('All')}
            >
              All Active Deals
            </S.DealPill>
            {DEALS.map((deal) => (
              <S.DealPill
                key={deal.name}
                active={dealFilter.toLowerCase() === deal.name.toLowerCase()}
                onClick={() => updateDealFilter(deal.name)}
              >
                <span className="tag" style={{ background: deal.color }}>
                  {deal.badge}
                </span>
                <span>{deal.name}</span>
              </S.DealPill>
            ))}
          </S.DealsSelectorGrid>
        </S.TabPanel>
      )}

      {/* TAB 5: PRICE DROP */}
      {activeTab === 'pricedrop' && (
        <S.TabPanel>
          <S.PanelHeader>
            <h3>📉 DEDICATED PRICE DROPS</h3>
            <p>
              Premium streetwear cuts with recently marked-down prices. Maximum savings on our most wanted pieces.
            </p>
          </S.PanelHeader>

          <S.ProductCardsGrid>
            {priceDropProducts.slice(0, 4).map((product) => {
              const inWish = isInWishlist(product.sku);
              const discount =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 35;

              return (
                <S.Card
                  key={product.sku}
                  onClick={() => setSelectedProductForDetail(product)}
                >
                  <S.ImageWrap>
                    <img
                      src={getProductImage(product, 1)}
                      alt={product.title}
                    />
                    <S.PriceDropBadge>-{discount}% PRICE DROP</S.PriceDropBadge>
                    <S.WishButton
                      active={inWish}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                    >
                      ♥
                    </S.WishButton>
                  </S.ImageWrap>
                  <S.CardBody>
                    <span className="category">{product.category}</span>
                    <h4>{product.title}</h4>
                    <div className="prices">
                      <span className="current">
                        {product.currencyFormat}
                        {formatPrice(product.price, product.currencyId)}
                      </span>
                      {product.originalPrice && (
                        <span className="original">
                          {product.currencyFormat}
                          {formatPrice(
                            product.originalPrice,
                            product.currencyId
                          )}
                        </span>
                      )}
                    </div>
                    <S.QuickAddButton onClick={(e) => handleQuickAdd(product, e)}>
                      + ADD TO BAG
                    </S.QuickAddButton>
                  </S.CardBody>
                </S.Card>
              );
            })}
          </S.ProductCardsGrid>
        </S.TabPanel>
      )}

      {/* TAB 6: POPULARITY */}
      {activeTab === 'popularity' && (
        <S.TabPanel>
          <S.PanelHeader>
            <h3>👑 COMMUNITY RANKINGS & POPULARITY</h3>
            <p>Verified sales data, customer ratings, and community love.</p>
          </S.PanelHeader>

          <S.PopularitySections>
            <S.PopularGroup>
              <h4>🔥 Most Purchased This Week</h4>
              <S.MiniList>
                {mostPurchasedThisWeek.slice(0, 3).map((p) => (
                  <S.MiniItem
                    key={p.sku}
                    onClick={() => setSelectedProductForDetail(p)}
                  >
                    <img src={getProductImage(p, 1, true)} alt={p.title} />
                    <div className="info">
                      <strong>{p.title}</strong>
                      <span className="sold">
                        🔥 {p.purchaseCountThisWeek || 450}+ sold this week
                      </span>
                      <span className="price">
                        {p.currencyFormat}
                        {formatPrice(p.price, p.currencyId)}
                      </span>
                    </div>
                  </S.MiniItem>
                ))}
              </S.MiniList>
            </S.PopularGroup>

            <S.PopularGroup>
              <h4>🏆 Best Sellers</h4>
              <S.MiniList>
                {bestSellers.slice(0, 3).map((p) => (
                  <S.MiniItem
                    key={p.sku}
                    onClick={() => setSelectedProductForDetail(p)}
                  >
                    <img src={getProductImage(p, 1, true)} alt={p.title} />
                    <div className="info">
                      <strong>{p.title}</strong>
                      <span className="sold">
                        ⭐ Best Seller Badge • {p.category}
                      </span>
                      <span className="price">
                        {p.currencyFormat}
                        {formatPrice(p.price, p.currencyId)}
                      </span>
                    </div>
                  </S.MiniItem>
                ))}
              </S.MiniList>
            </S.PopularGroup>

            <S.PopularGroup>
              <h4>⚡ Trending Among Customers</h4>
              <S.MiniList>
                {trendingAmongCustomers.slice(0, 3).map((p) => (
                  <S.MiniItem
                    key={p.sku}
                    onClick={() => setSelectedProductForDetail(p)}
                  >
                    <img src={getProductImage(p, 1, true)} alt={p.title} />
                    <div className="info">
                      <strong>{p.title}</strong>
                      <span className="sold">
                        🚀 Spiking Searches • {p.rating} ★
                      </span>
                      <span className="price">
                        {p.currencyFormat}
                        {formatPrice(p.price, p.currencyId)}
                      </span>
                    </div>
                  </S.MiniItem>
                ))}
              </S.MiniList>
            </S.PopularGroup>

            <S.PopularGroup>
              <h4>⭐ Community Favorites</h4>
              <S.MiniList>
                {communityFavorites.slice(0, 3).map((p) => (
                  <S.MiniItem
                    key={p.sku}
                    onClick={() => setSelectedProductForDetail(p)}
                  >
                    <img src={getProductImage(p, 1, true)} alt={p.title} />
                    <div className="info">
                      <strong>{p.title}</strong>
                      <span className="rating">
                        ★★★★★ {p.rating || 4.9} ({p.reviewsCount || 120} reviews)
                      </span>
                      <span className="price">
                        {p.currencyFormat}
                        {formatPrice(p.price, p.currencyId)}
                      </span>
                    </div>
                  </S.MiniItem>
                ))}
              </S.MiniList>
            </S.PopularGroup>
          </S.PopularitySections>
        </S.TabPanel>
      )}

      {/* TAB 7: PERSONALIZED FOR YOU */}
      {activeTab === 'personalized' && (
        <S.TabPanel>
          <S.PanelHeader>
            <h3>✨ PERSONALIZED FOR YOU</h3>
            <p>Tailored recommendations based on your viewing history and style vibes.</p>
          </S.PanelHeader>

          {recentlyViewed.length > 0 && (
            <S.PersonalizedSubSection>
              <h4>👀 Recently Viewed Products ({recentlyViewed.length})</h4>
              <S.HorizontalScroll>
                {recentlyViewed.map((p) => (
                  <S.RecentCard
                    key={p.sku}
                    onClick={() => setSelectedProductForDetail(p)}
                  >
                    <img src={getProductImage(p, 1, true)} alt={p.title} />
                    <p className="title">{p.title}</p>
                    <span className="price">
                      {p.currencyFormat}
                      {formatPrice(p.price, p.currencyId)}
                    </span>
                  </S.RecentCard>
                ))}
              </S.HorizontalScroll>
            </S.PersonalizedSubSection>
          )}

          <S.PersonalizedSubSection>
            <h4>🎯 Recommended for Your Style</h4>
            <S.ProductCardsGrid>
              {recommendedForYou.slice(0, 4).map((product) => (
                <S.Card
                  key={product.sku}
                  onClick={() => setSelectedProductForDetail(product)}
                >
                  <S.ImageWrap>
                    <img src={getProductImage(product, 1)} alt={product.title} />
                    <S.MatchBadge>98% STYLE MATCH</S.MatchBadge>
                  </S.ImageWrap>
                  <S.CardBody>
                    <span className="category">{product.category}</span>
                    <h4>{product.title}</h4>
                    <div className="prices">
                      <span className="current">
                        {product.currencyFormat}
                        {formatPrice(product.price, product.currencyId)}
                      </span>
                    </div>
                    <S.QuickAddButton onClick={(e) => handleQuickAdd(product, e)}>
                      + ADD TO BAG
                    </S.QuickAddButton>
                  </S.CardBody>
                </S.Card>
              ))}
            </S.ProductCardsGrid>
          </S.PersonalizedSubSection>

          {personalizedDeals.length > 0 && (
            <S.PersonalizedSubSection>
              <h4>🏷️ Personalized Deals Hand-Picked For You</h4>
              <S.ProductCardsGrid>
                {personalizedDeals.slice(0, 4).map((product) => (
                  <S.Card
                    key={product.sku}
                    onClick={() => setSelectedProductForDetail(product)}
                  >
                    <S.ImageWrap>
                      <img src={getProductImage(product, 1)} alt={product.title} />
                      <S.PriceDropBadge>BIG SAVINGS</S.PriceDropBadge>
                    </S.ImageWrap>
                    <S.CardBody>
                      <span className="category">{product.category}</span>
                      <h4>{product.title}</h4>
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
                      <S.QuickAddButton onClick={(e) => handleQuickAdd(product, e)}>
                        + ADD TO BAG
                      </S.QuickAddButton>
                    </S.CardBody>
                  </S.Card>
                ))}
              </S.ProductCardsGrid>
            </S.PersonalizedSubSection>
          )}
        </S.TabPanel>
      )}
    </S.DiscoverySection>
  );
};

export default SmartDiscovery;
