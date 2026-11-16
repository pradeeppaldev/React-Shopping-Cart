import React, { useState } from 'react';
import { useUser } from 'contexts/user-context';
import { useGamification } from 'contexts/gamification-context';
import { useCart } from 'contexts/cart-context';
import { useWishlist } from 'contexts/wishlist-context';
import { useProducts } from 'contexts/products-context';
import { MoodType, ICartProduct } from 'models';
import formatPrice from 'utils/formatPrice';
import getProductImage from 'utils/getProductImage';
import * as S from './style';

const ALL_MOODS: MoodType[] = [
  'Streetwear',
  'Casual',
  'Party Mode',
  'Minimal',
  'Aesthetic',
  'Sporty',
  'Bold',
  'Chill',
];

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const BUDGET_PREFS = [
  { id: 'under-299', label: 'Under ₹299 (Pocket Friendly)' },
  { id: 'under-499', label: 'Under ₹499 (Budget Fit)' },
  { id: 'under-999', label: 'Under ₹999 (Most Popular)' },
  { id: 'under-1499', label: 'Under ₹1499 (Premium Casual)' },
  { id: 'premium', label: '₹1500+ (Luxury Archive Drops)' },
];

export const UserProfileModal: React.FC = () => {
  const {
    profile,
    updateProfile,
    orders,
    isProfileOpen,
    closeProfile,
    activeProfileTab,
    setActiveProfileTab,
    showToast,
  } = useUser();

  const {
    coins,
    streakDays,
    referralCode,
    referralCount,
    referralCoinsEarned,
    simulateFriendReferral,
    openRewardsModal,
  } = useGamification();

  const { addProduct, openCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { recentlyViewed, setSelectedProductForDetail } = useProducts();

  // Local state for editable profile form
  const [formData, setFormData] = useState({
    name: profile.name,
    username: profile.username,
    email: profile.email,
    phone: profile.phone,
    birthday: profile.birthday,
    bio: profile.bio,
    avatar: profile.avatar,
    fullName: profile.shippingAddress.fullName,
    line1: profile.shippingAddress.line1,
    city: profile.shippingAddress.city,
    state: profile.shippingAddress.state,
    postalCode: profile.shippingAddress.postalCode,
    country: profile.shippingAddress.country,
  });

  if (!isProfileOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      birthday: formData.birthday,
      bio: formData.bio,
      avatar: formData.avatar,
      shippingAddress: {
        fullName: formData.fullName,
        line1: formData.line1,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
    });
  };

  const handleToggleSize = (size: string) => {
    const current = profile.preferredSizes || [];
    const updated = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    updateProfile({ preferredSizes: updated });
  };

  const handleSelectMood = (mood: string) => {
    updateProfile({ preferredMood: mood });
  };

  const handleSelectBudget = (budget: string) => {
    updateProfile({ preferredBudget: budget });
  };

  const handleReorder = (orderItems: ICartProduct[]) => {
    orderItems.forEach((item) => {
      addProduct(item);
    });
    closeProfile();
    openCart();
    showToast(`Items from order re-added to your shopping bag!`, 'success', '🛍️');
  };

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(referralCode);
    showToast(`Referral code ${referralCode} copied to clipboard!`, 'success', '📋');
  };

  const handleSimulateReferral = () => {
    simulateFriendReferral();
    showToast(`Friend registered with your code! +250 Coins credited to your vault.`, 'reward', '🪙');
  };

  return (
    <S.Overlay onClick={closeProfile}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <div className="user-badge">
            <img src={profile.avatar} alt={profile.name} />
            <div className="names">
              <h2>
                {profile.name}
                <span className="tier-tag">VIP ARCHIVE MEMBER</span>
              </h2>
              <p>
                {profile.username} • {profile.email}
              </p>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={closeProfile}
            aria-label="Close profile dashboard"
          >
            ✕
          </button>
        </S.Header>

        <S.TabNav>
          <S.TabButton
            active={activeProfileTab === 'profile'}
            onClick={() => setActiveProfileTab('profile')}
          >
            👤 Personal Info
          </S.TabButton>
          <S.TabButton
            active={activeProfileTab === 'orders'}
            onClick={() => setActiveProfileTab('orders')}
          >
            📦 Orders History ({orders.length})
          </S.TabButton>
          <S.TabButton
            active={activeProfileTab === 'rewards'}
            onClick={() => setActiveProfileTab('rewards')}
          >
            🪙 Rewards & Streaks
          </S.TabButton>
          <S.TabButton
            active={activeProfileTab === 'wishlist'}
            onClick={() => setActiveProfileTab('wishlist')}
          >
            💖 Saved & Viewed
          </S.TabButton>
          <S.TabButton
            active={activeProfileTab === 'preferences'}
            onClick={() => setActiveProfileTab('preferences')}
          >
            ⚙️ Preferences
          </S.TabButton>
        </S.TabNav>

        <S.ContentBody>
          {/* TAB 1: PERSONAL INFORMATION & EDITABLE PROFILE */}
          {activeProfileTab === 'profile' && (
            <form onSubmit={handleSaveProfile}>
              <S.ProfileGrid>
                <S.FormGroup>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>Username / Handle</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>Avatar Image URL</label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup className="full-width">
                  <label>Style Bio & Vibe Manifesto</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup className="full-width">
                  <h4 style={{ color: '#00ff88', margin: '8px 0 2px 0', fontSize: '0.95rem' }}>
                    📍 Default Shipping Destination
                  </h4>
                </S.FormGroup>

                <S.FormGroup>
                  <label>Recipient Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>Delivery Address Line</label>
                  <input
                    type="text"
                    name="line1"
                    value={formData.line1}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <label>State & Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={`${formData.state} - ${formData.postalCode}`}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({ ...prev, postalCode: val }));
                    }}
                  />
                </S.FormGroup>

                <S.SaveButton type="submit">
                  💾 SAVE CHANGES & PREFERENCES
                </S.SaveButton>
              </S.ProfileGrid>
            </form>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeProfileTab === 'orders' && (
            <S.OrdersList>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                  <p>No orders placed yet. Explore our curated collections to start your archive!</p>
                </div>
              ) : (
                orders.map((order) => (
                  <S.OrderCard key={order.id}>
                    <div className="order-header">
                      <div className="id-date">
                        <h4>Order #{order.id}</h4>
                        <span>Placed on {order.date} • {order.items.length} item(s)</span>
                      </div>
                      <span className="status-badge">
                        ✓ {order.status}
                      </span>
                    </div>

                    <div className="order-items">
                      {order.items.map((item, idx) => (
                        <div className="order-item-row" key={`${item.sku}-${idx}`}>
                          <img src={getProductImage(item, 1, true)} alt={item.title} />
                          <div className="item-info">
                            <h5>{item.title}</h5>
                            <p>
                              Size: {item.selectedSize || 'Standard'} • Color: {item.selectedColor || 'Archive Edition'} • Qty: {item.quantity || 1}
                            </p>
                          </div>
                          <div className="item-price">
                            {order.currencyFormat}{formatPrice(item.price * (item.quantity || 1), order.currencyId)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="meta">
                        Total: <strong>{order.currencyFormat}{formatPrice(order.totalPrice, order.currencyId)}</strong>
                        {' '}({order.paymentMethod}) • Tracking: <span style={{ fontFamily: 'monospace', color: '#4a9eff' }}>{order.trackingNumber}</span>
                      </div>
                      <div className="actions">
                        <button
                          className="reorder-btn"
                          onClick={() => handleReorder(order.items)}
                        >
                          🔄 Reorder Fit
                        </button>
                      </div>
                    </div>
                  </S.OrderCard>
                ))
              )}
            </S.OrdersList>
          )}

          {/* TAB 3: REWARDS, STREAKS & REFERRAL DASHBOARD */}
          {activeProfileTab === 'rewards' && (
            <div>
              <S.RewardsSummaryCard>
                <div className="balance-wrap">
                  <span className="coin-icon">🪙</span>
                  <div>
                    <h3>{coins.toLocaleString()} VibeCoins</h3>
                    <p>Worth approx. ₹{(coins / 5).toFixed(0)} in instant discounts and merchandise</p>
                  </div>
                </div>
                <button
                  className="open-vault-btn"
                  onClick={() => {
                    closeProfile();
                    openRewardsModal('rewards');
                  }}
                >
                  Open Rewards Vault →
                </button>
              </S.RewardsSummaryCard>

              {/* Shopping Streak Progress */}
              <S.StreakCard>
                <div className="streak-head">
                  <h4>🔥 Active Shopping Streak: {streakDays} Consecutive Days</h4>
                  <span>Next Milestone: {streakDays >= 30 ? '30 Days Complete' : streakDays >= 15 ? '30-Day Legend' : streakDays >= 7 ? '15-Day Champion' : '7-Day Explorer'}</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min(100, (streakDays / 30) * 100)}%`,
                    }}
                  />
                </div>
                <div className="streak-milestones">
                  <div className={`milestone ${streakDays >= 3 ? 'achieved' : ''}`}>
                    <strong>3 Days</strong>
                    <span>+50 Coins {streakDays >= 3 ? '✓' : ''}</span>
                  </div>
                  <div className={`milestone ${streakDays >= 7 ? 'achieved' : ''}`}>
                    <strong>7 Days</strong>
                    <span>+150 Coins {streakDays >= 7 ? '✓' : ''}</span>
                  </div>
                  <div className={`milestone ${streakDays >= 15 ? 'achieved' : ''}`}>
                    <strong>15 Days</strong>
                    <span>+350 Coins {streakDays >= 15 ? '✓' : ''}</span>
                  </div>
                  <div className={`milestone ${streakDays >= 30 ? 'achieved' : ''}`}>
                    <strong>30 Days</strong>
                    <span>+1000 Coins {streakDays >= 30 ? '✓' : ''}</span>
                  </div>
                </div>
              </S.StreakCard>

              {/* Referral Dashboard */}
              <S.ReferralBox>
                <h4>🤝 Refer & Earn Hub</h4>
                <p>
                  Give friends <strong>₹200 off</strong> their first order. You earn{' '}
                  <strong>250 VibeCoins</strong> for every friend who joins.
                </p>
                <div className="code-row">
                  <input type="text" readOnly value={referralCode} />
                  <button onClick={handleCopyReferral}>Copy Code</button>
                  <button
                    onClick={handleSimulateReferral}
                    style={{ background: '#ffd700', color: '#000' }}
                  >
                    + Simulate Friend
                  </button>
                </div>
                <div style={{ marginTop: '14px', fontSize: '0.85rem', color: '#9aa0a6' }}>
                  Invited Friends: <strong style={{ color: '#fff' }}>{referralCount}</strong> •
                  Coins Earned from Invites: <strong style={{ color: '#ffd700' }}>{referralCoinsEarned} 🪙</strong>
                </div>
              </S.ReferralBox>
            </div>
          )}

          {/* TAB 4: SAVED WISHLIST & RECENTLY VIEWED */}
          {activeProfileTab === 'wishlist' && (
            <div>
              <h4 style={{ color: '#fff', margin: '0 0 14px 0', fontSize: '1.05rem' }}>
                💖 Your Saved Wishlist ({wishlist.length})
              </h4>
              {wishlist.length === 0 ? (
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '24px' }}>
                  Your wishlist is empty. Tap the heart icon on any product to save it here!
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '14px',
                    marginBottom: '32px',
                  }}
                >
                  {wishlist.map((item) => (
                    <div
                      key={item.sku}
                      style={{
                        background: '#141722',
                        border: '1px solid #232838',
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <img
                        src={getProductImage(item, 1, true)}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '140px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <strong style={{ fontSize: '0.85rem', color: '#fff' }}>
                        {item.title}
                      </strong>
                      <span style={{ color: '#00ff88', fontWeight: 700, fontSize: '0.85rem' }}>
                        {item.currencyFormat}{formatPrice(item.price, item.currencyId)}
                      </span>
                      <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
                        <button
                          style={{
                            flex: 1,
                            background: '#00ff88',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            addProduct({
                              ...item,
                              quantity: 1,
                              selectedSize: item.availableSizes?.[0] || 'M',
                              selectedColor: item.colors?.[0]?.name || '',
                            });
                            removeFromWishlist(item.sku);
                            showToast(`Moved ${item.title} to your bag!`, 'success', '🛍️');
                          }}
                        >
                          + Bag
                        </button>
                        <button
                          style={{
                            background: '#232838',
                            color: '#ff4d4d',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                          }}
                          onClick={() => removeFromWishlist(item.sku)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <h4 style={{ color: '#fff', margin: '0 0 14px 0', fontSize: '1.05rem' }}>
                👀 Recently Viewed Fits ({recentlyViewed.length})
              </h4>
              {recentlyViewed.length === 0 ? (
                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                  Browse through products to see your live browsing trail here.
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '14px',
                  }}
                >
                  {recentlyViewed.map((item) => (
                    <div
                      key={item.sku}
                      onClick={() => {
                        closeProfile();
                        setSelectedProductForDetail(item);
                      }}
                      style={{
                        background: '#141722',
                        border: '1px solid #232838',
                        borderRadius: '12px',
                        padding: '12px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <img
                        src={getProductImage(item, 1, true)}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '140px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                      <strong
                        style={{
                          display: 'block',
                          fontSize: '0.85rem',
                          color: '#fff',
                          marginTop: '6px',
                        }}
                      >
                        {item.title}
                      </strong>
                      <span style={{ color: '#00ff88', fontWeight: 700, fontSize: '0.85rem' }}>
                        {item.currencyFormat}{formatPrice(item.price, item.currencyId)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SAVED MOOD, BUDGET & SHOPPING PREFERENCES */}
          {activeProfileTab === 'preferences' && (
            <S.PreferencesWrap>
              <div className="pref-section">
                <h4>🎯 Preferred Mood & Aesthetic</h4>
                <p>We tailor your homepage recommendation feed based on your dominant mood.</p>
                <div className="options-grid">
                  {ALL_MOODS.map((mood) => (
                    <S.OptionPill
                      key={mood}
                      selected={profile.preferredMood === mood}
                      onClick={() => handleSelectMood(mood)}
                    >
                      {mood === profile.preferredMood ? '✓ ' : ''}{mood}
                    </S.OptionPill>
                  ))}
                </div>
              </div>

              <div className="pref-section">
                <h4>💰 Preferred Shopping Budget</h4>
                <p>Quickly highlight pieces that match your target price bracket.</p>
                <div className="options-grid">
                  {BUDGET_PREFS.map((b) => (
                    <S.OptionPill
                      key={b.id}
                      selected={profile.preferredBudget === b.id}
                      onClick={() => handleSelectBudget(b.id)}
                    >
                      {b.id === profile.preferredBudget ? '✓ ' : ''}{b.label}
                    </S.OptionPill>
                  ))}
                </div>
              </div>

              <div className="pref-section">
                <h4>📏 Preferred Garment Sizes</h4>
                <p>Select sizes to auto-filter and pre-select your fits.</p>
                <div className="options-grid">
                  {ALL_SIZES.map((size) => {
                    const isSelected = profile.preferredSizes?.includes(size);
                    return (
                      <S.OptionPill
                        key={size}
                        selected={isSelected}
                        onClick={() => handleToggleSize(size)}
                      >
                        {isSelected ? '✓ ' : ''}{size}
                      </S.OptionPill>
                    );
                  })}
                </div>
              </div>
            </S.PreferencesWrap>
          )}
        </S.ContentBody>
      </S.Modal>
    </S.Overlay>
  );
};

export default UserProfileModal;
