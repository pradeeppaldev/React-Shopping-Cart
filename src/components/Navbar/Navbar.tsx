import React from 'react';
import { useCart } from 'contexts/cart-context';
import { useWishlist } from 'contexts/wishlist-context';
import { useProducts } from 'contexts/products-context';
import { useGamification } from 'contexts/gamification-context';
import { useUser } from 'contexts/user-context';
import * as S from './style';

const Navbar: React.FC = () => {
  const { openCart, total } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const {
    coins,
    setIsRewardsModalOpen,
    setIsSpinModalOpen,
  } = useGamification();
  const {
    profile,
    openProfile,
    openNotifications,
    unreadNotificationsCount,
  } = useUser();
  const {
    searchQuery,
    updateSearchQuery,
    categoryFilter,
    updateCategoryFilter,
  } = useProducts();

  const categories = [
    'All',
    'Streetwear',
    'Men\'s Fashion',
    'Women\'s Fashion',
    'Footwear',
    'Accessories',
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    updateSearchQuery('');
  };

  const scrollToDiscovery = (view?: string) => {
    const el = document.getElementById('smart-discovery-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCurated = () => {
    const el = document.getElementById('homepage-curated-sections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <S.NavContainer>
      {/* Announcement Marquee Ticker */}
      <S.AnnouncementBar>
        <S.TickerTrack>
          <span>⚡ LIMITED DROP: USE CODE <b>WELCOME200</b> FOR ₹200 OFF</span>
          <span>•</span>
          <span>🚚 FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER ₹500</span>
          <span>•</span>
          <span>🌱 100% SUSTAINABLE & RECYCLED PACKAGING</span>
          <span>•</span>
          <span>🔥 GEN Z STREETWEAR ARCHIVE {'//'} SS26</span>
          <span>•</span>
          <span>⚡ LIMITED DROP: USE CODE <b>WELCOME200</b> FOR ₹200 OFF</span>
          <span>•</span>
          <span>🚚 FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER ₹500</span>
          <span>•</span>
          <span>🌱 100% SUSTAINABLE & RECYCLED PACKAGING</span>
          <span>•</span>
          <span>🔥 GEN Z STREETWEAR ARCHIVE {'//'} SS26</span>
        </S.TickerTrack>
      </S.AnnouncementBar>

      {/* Main Header */}
      <S.MainHeader>
        <S.HeaderContent>
          <S.LogoWrapper onClick={() => updateCategoryFilter('All')}>
            <S.LogoBrand>
              VIBE<span>CART</span>
            </S.LogoBrand>
            <S.LogoTagline>STUDIO & ARCHIVE</S.LogoTagline>
          </S.LogoWrapper>

          {/* Search Box */}
          <S.SearchWrapper>
            <S.SearchIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </S.SearchIcon>
            <S.SearchInput
              type="text"
              placeholder="Search oversized tees, boots, cargos, chains..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
            {searchQuery && (
              <S.ClearSearchButton onClick={handleClearSearch} title="Clear search">
                ✕
              </S.ClearSearchButton>
            )}
          </S.SearchWrapper>

          {/* Action Buttons */}
          <S.ActionsWrapper>
            {/* Gamification Coins Vault Button */}
            <S.CoinsPill onClick={() => setIsRewardsModalOpen(true)} title="View VibeCoins & Rewards Vault">
              <span className="coin">🪙</span>
              <span className="amount">{coins}</span>
            </S.CoinsPill>

            {/* Spin & Win Button */}
            <S.SpinPill onClick={() => setIsSpinModalOpen(true)} title="Daily Spin & Win">
              <span className="wheel">🎡</span>
              <span className="text">SPIN</span>
            </S.SpinPill>

            {/* Notifications Button */}
            <S.IconButton
              onClick={openNotifications}
              title="Notifications & Alerts"
              aria-label="Notifications"
            >
              <span style={{ fontSize: '1.15rem' }}>🔔</span>
              {unreadNotificationsCount > 0 && (
                <S.NotifBadge>{unreadNotificationsCount}</S.NotifBadge>
              )}
            </S.IconButton>

            {/* Wishlist Button */}
            <S.IconButton
              onClick={() => setIsWishlistOpen(true)}
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <S.HeartIcon
                viewBox="0 0 24 24"
                fill={wishlistCount > 0 ? '#ff3b30' : 'none'}
                stroke={wishlistCount > 0 ? '#ff3b30' : 'currentColor'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </S.HeartIcon>
              {wishlistCount > 0 && <S.Badge>{wishlistCount}</S.Badge>}
            </S.IconButton>

            {/* Cart Button */}
            <S.CartButton onClick={openCart} aria-label="Open shopping cart">
              <S.BagIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </S.BagIcon>
              <S.CartTextWrapper>
                <S.CartTitle>BAG</S.CartTitle>
                <S.CartAmount>
                  {total.currencyFormat}
                  {total.totalPrice.toFixed(2)}
                </S.CartAmount>
              </S.CartTextWrapper>
              <S.Badge>{total.productQuantity}</S.Badge>
            </S.CartButton>

            {/* User Profile Button */}
            <S.ProfileButton
              onClick={() => openProfile('profile')}
              title="User Profile & Order Dashboard"
              aria-label="User profile"
            >
              <img src={profile.avatar} alt={profile.name} />
              <span className="name">{profile.name.split(' ')[0]}</span>
            </S.ProfileButton>
          </S.ActionsWrapper>
        </S.HeaderContent>

        {/* Category Nav Bar */}
        <S.CategoryNav>
          <S.CategoryList>
            {categories.map((cat) => (
              <S.CategoryItem
                key={cat}
                active={categoryFilter.toLowerCase() === cat.toLowerCase()}
                onClick={() => updateCategoryFilter(cat)}
              >
                {cat}
                {cat === 'Streetwear' && <S.HotTag>HOT</S.HotTag>}
                {cat === 'Footwear' && <S.NewTag>NEW</S.NewTag>}
              </S.CategoryItem>
            ))}
            <S.CategoryItem
              active={false}
              onClick={() => scrollToDiscovery()}
              style={{ color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.4)' }}
            >
              ✨ Smart Discovery
            </S.CategoryItem>
            <S.CategoryItem
              active={false}
              onClick={() => scrollToCurated()}
              style={{ color: '#ffd700', borderColor: 'rgba(255, 215, 0, 0.4)' }}
            >
              🔥 Viral & Trending
            </S.CategoryItem>
          </S.CategoryList>
        </S.CategoryNav>
      </S.MainHeader>
    </S.NavContainer>
  );
};

export default Navbar;
