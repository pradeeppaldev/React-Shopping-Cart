import React, { useState } from 'react';
import { useGamification } from 'contexts/gamification-context';
import { useUser } from 'contexts/user-context';
import * as S from './style';

const COUPONS_TO_REDEEM = [
  { code: 'COIN100', cost: 200, discount: '₹100 OFF', desc: 'Flat ₹100 off on any order above ₹499' },
  { code: 'COIN250', cost: 400, discount: '₹250 OFF', desc: 'Flat ₹250 off on any order above ₹999' },
  { code: 'COIN500', cost: 800, discount: '₹500 OFF', desc: 'Flat ₹500 off on any order above ₹1499' },
  { code: 'CASHBACK200', cost: 450, discount: '₹200 CASHBACK', desc: 'Simulated cashback credited directly to wallet' },
  { code: 'FREESHIP', cost: 150, discount: 'FREE EXPRESS SHIPPING', desc: 'Zero shipping fee with no minimum order' },
  { code: 'MYSTERYDROP', cost: 600, discount: 'FREE MERCH PASS', desc: 'Free vintage cap or chain included in your next package' },
];

const RewardsDashboardModal: React.FC = () => {
  const {
    coins,
    transactions,
    streakDays,
    streakClaimedToday,
    claimDailyStreak,
    challenges,
    claimChallengeReward,
    achievements,
    referralCode,
    referralCount,
    referralCoinsEarned,
    simulateFriendReferral,
    redeemCoinsForCoupon,
    redeemedCoupons,
    isRewardsModalOpen,
    setIsRewardsModalOpen,
    setIsSpinModalOpen,
    birthdayClaimed,
    festivalClaimed,
    anniversaryClaimed,
    claimSpecialReward,
  } = useGamification();

  const [activeSection, setActiveSection] = useState<
    'redeem' | 'streaks' | 'challenges' | 'occasions' | 'refer' | 'history'
  >('redeem');

  const [copyStatus, setCopyStatus] = useState<string>('Copy Code');
  const [streakStatusMsg, setStreakStatusMsg] = useState<string>('');
  const [referralFeedback, setReferralFeedback] = useState<string>('');

  const { showToast } = useUser();

  if (!isRewardsModalOpen) return null;

  const handleCopyReferral = () => {
    try {
      navigator.clipboard.writeText(referralCode);
      setCopyStatus('Copied! 🎉');
      showToast(`Referral code ${referralCode} copied to clipboard!`, 'success', '📋');
      setTimeout(() => setCopyStatus('Copy Code'), 2500);
    } catch {
      setCopyStatus('Copied! 🎉');
      showToast(`Referral code copied!`, 'success', '📋');
      setTimeout(() => setCopyStatus('Copy Code'), 2500);
    }
  };

  const handleClaimStreak = () => {
    const res = claimDailyStreak();
    setStreakStatusMsg(res.message);
    if (res.coins > 0) {
      showToast(`Streak claimed! +${res.coins} VibeCoins added.`, 'reward', '🔥');
    } else {
      showToast(res.message, 'info', '⏳');
    }
  };

  const handleSimulateFriend = () => {
    const res = simulateFriendReferral();
    setReferralFeedback(
      `🎉 Simulated Referral Success! ${res.friendName} used code ${referralCode}. You earned +${res.coinsEarned} VibeCoins!`
    );
    showToast(`Friend ${res.friendName} joined! +${res.coinsEarned} Coins credited.`, 'reward', '🤝');
    setTimeout(() => setReferralFeedback(''), 5000);
  };

  const handleRedeem = (code: string, cost: number, disc: string) => {
    redeemCoinsForCoupon(code, cost, disc);
    showToast(`Redeemed coupon ${code} (${disc})! Apply at checkout.`, 'reward', '🎟️');
  };

  return (
    <S.Overlay onClick={() => setIsRewardsModalOpen(false)}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={() => setIsRewardsModalOpen(false)}>✕</S.CloseButton>

        {/* Hero Banner: Coin Balance */}
        <S.CoinHeader>
          <div className="left">
            <span className="badge">⚡ GEN Z LOYALTY CLUB</span>
            <h2>VIBECOINS REWARDS VAULT</h2>
            <div className="balance-wrap">
              <span className="coin-icon">🪙</span>
              <span className="balance">{coins}</span>
              <span className="unit">VibeCoins</span>
            </div>
            <p className="worth">
              Equivalent to ~₹{Math.round(coins * 0.5)} discount value across all drops.
            </p>
          </div>

          <div className="right">
            <S.SpinTriggerButton
              onClick={() => {
                setIsRewardsModalOpen(false);
                setIsSpinModalOpen(true);
              }}
            >
              <span className="wheel">🎡</span>
              <div>
                <strong>SPIN & WIN</strong>
                <small>Daily Free Spin</small>
              </div>
            </S.SpinTriggerButton>
          </div>
        </S.CoinHeader>

        {/* Navigation Tabs */}
        <S.TabsRow>
          <S.TabBtn
            active={activeSection === 'redeem'}
            onClick={() => setActiveSection('redeem')}
          >
            🪙 Redeem Coupons
          </S.TabBtn>
          <S.TabBtn
            active={activeSection === 'streaks'}
            onClick={() => setActiveSection('streaks')}
          >
            🔥 Shopping Streaks
          </S.TabBtn>
          <S.TabBtn
            active={activeSection === 'challenges'}
            onClick={() => setActiveSection('challenges')}
          >
            🎯 Challenges & Badges
          </S.TabBtn>
          <S.TabBtn
            active={activeSection === 'occasions'}
            onClick={() => setActiveSection('occasions')}
          >
            🎂 Special Occasions
          </S.TabBtn>
          <S.TabBtn
            active={activeSection === 'refer'}
            onClick={() => setActiveSection('refer')}
          >
            🤝 Refer & Earn
          </S.TabBtn>
          <S.TabBtn
            active={activeSection === 'history'}
            onClick={() => setActiveSection('history')}
          >
            📜 Coin History
          </S.TabBtn>
        </S.TabsRow>

        {/* SECTION 1: REDEEM COUPONS */}
        {activeSection === 'redeem' && (
          <S.SectionBody>
            <S.SectionIntro>
              <h3>REDEEM COINS FOR INSTANT DISCOUNTS & VOUCHERS</h3>
              <p>Exchange your earned VibeCoins for checkout coupons or simulated cashback passes.</p>
            </S.SectionIntro>

            <S.CouponsGrid>
              {COUPONS_TO_REDEEM.map((c) => {
                const canAfford = coins >= c.cost;
                return (
                  <S.CouponCard key={c.code}>
                    <div className="top">
                      <span className="discount">{c.discount}</span>
                      <span className="cost">🪙 {c.cost} Coins</span>
                    </div>
                    <p className="desc">{c.desc}</p>
                    <div className="bottom">
                      <span className="code">CODE: <b>{c.code}</b></span>
                      <S.RedeemButton
                        disabled={!canAfford}
                        onClick={() => handleRedeem(c.code, c.cost, c.discount)}
                      >
                        {canAfford ? 'REDEEM' : 'NOT ENOUGH COINS'}
                      </S.RedeemButton>
                    </div>
                  </S.CouponCard>
                );
              })}
            </S.CouponsGrid>

            {redeemedCoupons.length > 0 && (
              <S.ActiveCouponsBox>
                <h4>🎟️ YOUR UNLOCKED COUPONS ({redeemedCoupons.length})</h4>
                <div className="coupons-list">
                  {redeemedCoupons.map((rc, idx) => (
                    <S.ActiveCouponItem key={idx}>
                      <span className="code">{rc.code}</span>
                      <span className="disc">{rc.discount}</span>
                      <span className="exp">{rc.expires}</span>
                    </S.ActiveCouponItem>
                  ))}
                </div>
              </S.ActiveCouponsBox>
            )}
          </S.SectionBody>
        )}

        {/* SECTION 2: SHOPPING STREAKS */}
        {activeSection === 'streaks' && (
          <S.SectionBody>
            <S.StreakHero>
              <div className="fire-col">
                <span className="flame">🔥</span>
                <span className="days">{streakDays}</span>
                <span className="label">DAY STREAK</span>
              </div>
              <div className="action-col">
                <h3>DAILY SHOPPING & ENGAGEMENT STREAK</h3>
                <p>
                  Check in daily or interact with our drops to build your streak and unlock
                  massive bonus coins and badges at 3, 7, 15, and 30 days!
                </p>
                <S.CheckInButton
                  onClick={handleClaimStreak}
                  disabled={streakClaimedToday}
                >
                  {streakClaimedToday
                    ? '✓ TODAY\'S BONUS CLAIMED'
                    : `CLAIM DAY ${streakDays + 1} STREAK (+100 COINS)`}
                </S.CheckInButton>
                {streakStatusMsg && <p className="status-msg">{streakStatusMsg}</p>}
              </div>
            </S.StreakHero>

            <S.MilestonesTracker>
              <h4>STREAK MILESTONES</h4>
              <S.MilestoneGrid>
                <S.MilestoneCard reached={streakDays >= 3}>
                  <span className="day">DAY 3</span>
                  <span className="gift">🔥 +100 Coins</span>
                  <span className="status">{streakDays >= 3 ? 'COMPLETED' : 'UPCOMING'}</span>
                </S.MilestoneCard>

                <S.MilestoneCard reached={streakDays >= 7}>
                  <span className="day">DAY 7</span>
                  <span className="gift">⚡ +300 Coins + 10% Coupon</span>
                  <span className="status">{streakDays >= 7 ? 'COMPLETED' : `${7 - streakDays} days to go`}</span>
                </S.MilestoneCard>

                <S.MilestoneCard reached={streakDays >= 15}>
                  <span className="day">DAY 15</span>
                  <span className="gift">👑 +750 Coins + Diamond Tier</span>
                  <span className="status">{streakDays >= 15 ? 'COMPLETED' : `${15 - streakDays} days to go`}</span>
                </S.MilestoneCard>

                <S.MilestoneCard reached={streakDays >= 30}>
                  <span className="day">DAY 30</span>
                  <span className="gift">💎 +2000 Coins + VIP Merch Pass</span>
                  <span className="status">{streakDays >= 30 ? 'COMPLETED' : `${30 - streakDays} days to go`}</span>
                </S.MilestoneCard>
              </S.MilestoneGrid>
            </S.MilestonesTracker>
          </S.SectionBody>
        )}

        {/* SECTION 3: CHALLENGES & BADGES */}
        {activeSection === 'challenges' && (
          <S.SectionBody>
            <S.SectionIntro>
              <h3>ACTIVE SHOPPING CHALLENGES</h3>
              <p>Complete shopping actions and engagement tasks to level up your coin balance.</p>
            </S.SectionIntro>

            <S.ChallengesList>
              {challenges.map((c) => {
                const percent = Math.min(100, (c.progress / c.target) * 100);
                return (
                  <S.ChallengeItem key={c.id}>
                    <div className="left">
                      <strong>{c.title}</strong>
                      <p>{c.description}</p>
                      <div className="progress-bar">
                        <div className="fill" style={{ width: `${percent}%` }} />
                      </div>
                      <small className="track">Progress: {c.progress} / {c.target}</small>
                    </div>

                    <div className="right">
                      <span className="reward">🪙 +{c.rewardCoins}</span>
                      {c.claimed ? (
                        <S.ClaimedPill>CLAIMED</S.ClaimedPill>
                      ) : (
                        <S.ChallengeClaimButton
                          disabled={!c.completed}
                          onClick={() => claimChallengeReward(c.id)}
                        >
                          {c.completed ? 'CLAIM COINS' : 'IN PROGRESS'}
                        </S.ChallengeClaimButton>
                      )}
                    </div>
                  </S.ChallengeItem>
                );
              })}
            </S.ChallengesList>

            <S.SectionIntro style={{ marginTop: 24 }}>
              <h3>ACHIEVEMENT BADGES</h3>
              <p>Milestone badges that prove your streetwear status.</p>
            </S.SectionIntro>

            <S.BadgesGrid>
              {achievements.map((a) => (
                <S.BadgeCard key={a.id} unlocked={a.unlocked}>
                  <span className="emoji">{a.badgeEmoji}</span>
                  <strong>{a.title}</strong>
                  <p>{a.description}</p>
                  <span className="tier">{a.tier}</span>
                </S.BadgeCard>
              ))}
            </S.BadgesGrid>
          </S.SectionBody>
        )}

        {/* SECTION 4: SPECIAL OCCASION REWARDS */}
        {activeSection === 'occasions' && (
          <S.SectionBody>
            <S.SectionIntro>
              <h3>CELEBRATE WITH EXCLUSIVE PERKS</h3>
              <p>Personalized rewards for birthdays, anniversaries, and festive drops.</p>
            </S.SectionIntro>

            <S.OccasionsRewardGrid>
              {/* Birthday Reward */}
              <S.OccasionRewardCard claimed={birthdayClaimed}>
                <span className="icon">🎂</span>
                <h4>BIRTHDAY SURPRISE DROP</h4>
                <p>Enjoy +500 Bonus Coins and a personalized 25% OFF coupon on your special month.</p>
                <S.SpecialClaimBtn
                  disabled={birthdayClaimed}
                  onClick={() => claimSpecialReward('birthday')}
                >
                  {birthdayClaimed ? '✓ BIRTHDAY PERK CLAIMED' : 'CLAIM BIRTHDAY GIFT'}
                </S.SpecialClaimBtn>
              </S.OccasionRewardCard>

              {/* Festive Reward */}
              <S.OccasionRewardCard claimed={festivalClaimed}>
                <span className="icon">🪔</span>
                <h4>FESTIVE CYBER DROP PASS</h4>
                <p>Limited festive celebration bonus: +750 Coins and ₹300 OFF on orders above ₹1299.</p>
                <S.SpecialClaimBtn
                  disabled={festivalClaimed}
                  onClick={() => claimSpecialReward('festival')}
                >
                  {festivalClaimed ? '✓ FESTIVE PERK CLAIMED' : 'CLAIM FESTIVE PASS'}
                </S.SpecialClaimBtn>
              </S.OccasionRewardCard>

              {/* Anniversary Reward */}
              <S.OccasionRewardCard claimed={anniversaryClaimed}>
                <span className="icon">🎉</span>
                <h4>VIBE COMMUNITY ANNIVERSARY</h4>
                <p>Celebrating your 1-Month milestone: +400 Coins credited to your vault!</p>
                <S.SpecialClaimBtn
                  disabled={anniversaryClaimed}
                  onClick={() => claimSpecialReward('anniversary')}
                >
                  {anniversaryClaimed ? '✓ ANNIVERSARY CLAIMED' : 'CLAIM ANNIVERSARY BONUS'}
                </S.SpecialClaimBtn>
              </S.OccasionRewardCard>
            </S.OccasionsRewardGrid>
          </S.SectionBody>
        )}

        {/* SECTION 5: REFER & EARN */}
        {activeSection === 'refer' && (
          <S.SectionBody>
            <S.ReferHero>
              <h3>REFER FRIENDS & EARN 500 COINS EACH</h3>
              <p>
                Give ₹250 off to your friends on their first order. When they shop, you get
                +500 VibeCoins credited to your balance instantly!
              </p>

              <S.ReferCodeBox>
                <span className="code-label">YOUR EXCLUSIVE REFERRAL CODE</span>
                <div className="code-row">
                  <span className="code">{referralCode}</span>
                  <S.CopyBtn onClick={handleCopyReferral}>{copyStatus}</S.CopyBtn>
                </div>
              </S.ReferCodeBox>

              {/* Interactive referral simulation */}
              <S.SimulateReferralBox>
                <span className="title">🧪 Test Gamified Referral Simulator</span>
                <p>Click below to simulate a friend signing up with your code and placing an order.</p>
                <S.SimulateBtn onClick={handleSimulateFriend}>
                  SIMULATE FRIEND JOINING (+500 COINS)
                </S.SimulateBtn>
                {referralFeedback && (
                  <S.FeedbackMsg>{referralFeedback}</S.FeedbackMsg>
                )}
              </S.SimulateReferralBox>

              <S.ReferralStatsRow>
                <div className="stat">
                  <strong>{referralCount}</strong>
                  <small>FRIENDS REFERRED</small>
                </div>
                <div className="stat">
                  <strong>🪙 {referralCoinsEarned}</strong>
                  <small>COINS EARNED</small>
                </div>
                <div className="stat">
                  <strong>₹{referralCount * 250}</strong>
                  <small>TOTAL SAVINGS GIFTED</small>
                </div>
              </S.ReferralStatsRow>
            </S.ReferHero>
          </S.SectionBody>
        )}

        {/* SECTION 6: COIN HISTORY */}
        {activeSection === 'history' && (
          <S.SectionBody>
            <S.SectionIntro>
              <h3>TRANSACTION & REDEMPTION HISTORY</h3>
              <p>Complete record of your earned coins and coupon redemptions.</p>
            </S.SectionIntro>

            <S.TransactionsList>
              {transactions.map((tx) => (
                <S.TxItem key={tx.id} type={tx.type}>
                  <div className="left">
                    <strong>{tx.title}</strong>
                    <small>{tx.date}</small>
                  </div>
                  <div className="right">
                    <span className="amount">
                      {tx.type === 'earned' ? `+${tx.amount}` : tx.amount} Coins
                    </span>
                  </div>
                </S.TxItem>
              ))}
            </S.TransactionsList>
          </S.SectionBody>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default RewardsDashboardModal;
