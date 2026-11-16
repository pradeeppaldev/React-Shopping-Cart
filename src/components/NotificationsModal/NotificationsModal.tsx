import React, { useState } from 'react';
import { useUser } from 'contexts/user-context';
import { useGamification } from 'contexts/gamification-context';
import { useProducts } from 'contexts/products-context';
import * as S from './style';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsOpen,
    closeNotifications,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useUser();

  const { openRewardsModal } = useGamification();
  const { setActiveDiscoveryView } = useProducts();

  const [activeFilter, setActiveFilter] = useState<'all' | 'offer' | 'reward' | 'price_drop'>('all');

  if (!isNotificationsOpen) return null;

  const filteredNotifs = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'offer') return n.type === 'offer' || n.type === 'announcement';
    if (activeFilter === 'reward') return n.type === 'birthday' || n.type === 'referral' || n.type === 'streak';
    if (activeFilter === 'price_drop') return n.type === 'price_drop';
    return true;
  });

  const handleActionClick = (notif: typeof notifications[0], e: React.MouseEvent) => {
    e.stopPropagation();
    markNotificationRead(notif.id);
    closeNotifications();

    if (notif.linkTab === 'rewards' || notif.type === 'birthday' || notif.type === 'streak') {
      openRewardsModal('rewards');
    } else if (notif.linkTab === 'price-drop') {
      setActiveDiscoveryView('pricedrop');
      const el = document.getElementById('smart-discovery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (notif.linkTab === 'deals') {
      setActiveDiscoveryView('deals');
      const el = document.getElementById('smart-discovery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <S.Overlay onClick={closeNotifications}>
      <S.Drawer onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <div className="title-group">
            <h3>NOTIFICATIONS & ALERTS</h3>
            {unreadNotificationsCount > 0 && (
              <span className="badge">{unreadNotificationsCount} NEW</span>
            )}
          </div>
          <button
            className="close-btn"
            onClick={closeNotifications}
            aria-label="Close notifications"
          >
            ✕
          </button>
        </S.Header>

        <S.ControlsBar>
          <button
            className="action-btn"
            onClick={markAllNotificationsRead}
            disabled={unreadNotificationsCount === 0}
          >
            ✓ Mark all as read
          </button>
          <button
            className="action-btn clear"
            onClick={clearNotifications}
            disabled={notifications.length === 0}
          >
            Clear all
          </button>
        </S.ControlsBar>

        <S.FilterPills>
          <S.FilterPill
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All Updates ({notifications.length})
          </S.FilterPill>
          <S.FilterPill
            active={activeFilter === 'offer'}
            onClick={() => setActiveFilter('offer')}
          >
            🏷️ Offers & Drops
          </S.FilterPill>
          <S.FilterPill
            active={activeFilter === 'reward'}
            onClick={() => setActiveFilter('reward')}
          >
            🎁 Rewards & Streaks
          </S.FilterPill>
          <S.FilterPill
            active={activeFilter === 'price_drop'}
            onClick={() => setActiveFilter('price_drop')}
          >
            📉 Price Drops
          </S.FilterPill>
        </S.FilterPills>

        <S.NotifList>
          {filteredNotifs.length === 0 ? (
            <S.EmptyState>
              <span className="big-icon">🔔</span>
              <h4>You're All Caught Up!</h4>
              <p>No new notifications right now. Check back later for fresh drops and coin bonuses.</p>
            </S.EmptyState>
          ) : (
            filteredNotifs.map((n) => (
              <S.NotifCard
                key={n.id}
                unread={!n.read}
                type={n.type}
                onClick={() => markNotificationRead(n.id)}
              >
                <div className="icon-wrap">{n.icon}</div>
                <div className="content-wrap">
                  <div className="top-meta">
                    <span className="badge">{n.badge || n.type.toUpperCase()}</span>
                    <span className="time">{n.timestamp}</span>
                  </div>
                  <h4>{n.title}</h4>
                  <p>{n.message}</p>
                  {(n.linkTab || n.type === 'offer' || n.type === 'birthday' || n.type === 'price_drop') && (
                    <button
                      className="cta-btn"
                      onClick={(e) => handleActionClick(n, e)}
                    >
                      {n.type === 'birthday' || n.type === 'referral'
                        ? 'Claim in Rewards Vault →'
                        : n.type === 'price_drop'
                        ? 'View Price Drop Deals →'
                        : 'Explore Offer →'}
                    </button>
                  )}
                </div>
              </S.NotifCard>
            ))
          )}
        </S.NotifList>
      </S.Drawer>
    </S.Overlay>
  );
};

export default NotificationsModal;
