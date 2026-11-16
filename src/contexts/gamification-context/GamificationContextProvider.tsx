import React, {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';

export interface ICoinTransaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'earned' | 'redeemed';
}

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  progress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  category: 'shopping' | 'engagement' | 'social';
}

export interface IAchievement {
  id: string;
  title: string;
  badgeEmoji: string;
  description: string;
  unlocked: boolean;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
}

export interface ISpinReward {
  id: string;
  label: string;
  type: 'coins' | 'coupon' | 'cashback' | 'shipping' | 'gift';
  value: string;
  description: string;
  color: string;
}

export interface IRedeemedCoupon {
  code: string;
  discount: string;
  description: string;
  expires: string;
}

export interface IGamificationContext {
  coins: number;
  transactions: ICoinTransaction[];
  streakDays: number;
  streakClaimedToday: boolean;
  claimDailyStreak: () => { coins: number; message: string };
  spinAvailable: boolean;
  spinWheel: () => Promise<ISpinReward>;
  lastSpinReward: ISpinReward | null;
  challenges: IChallenge[];
  claimChallengeReward: (id: string) => void;
  updateChallengeProgress: (id: string, delta?: number) => void;
  achievements: IAchievement[];
  referralCode: string;
  referralCount: number;
  referralCoinsEarned: number;
  simulateFriendReferral: () => { friendName: string; coinsEarned: number };
  redeemCoinsForCoupon: (
    couponCode: string,
    coinCost: number,
    discountLabel: string
  ) => boolean;
  redeemedCoupons: IRedeemedCoupon[];
  isRewardsModalOpen: boolean;
  setIsRewardsModalOpen: (open: boolean) => void;
  openRewardsModal: (tab?: string) => void;
  isSpinModalOpen: boolean;
  setIsSpinModalOpen: (open: boolean) => void;
  awardCoins: (amount: number, reason: string) => void;
  birthdayClaimed: boolean;
  festivalClaimed: boolean;
  anniversaryClaimed: boolean;
  claimSpecialReward: (type: 'birthday' | 'festival' | 'anniversary') => void;
}

const GamificationContext = createContext<IGamificationContext | undefined>(
  undefined
);

export const useGamification = (): IGamificationContext => {
  const context = useContext(GamificationContext);
  if (!context) {
    return {
      coins: 450,
      transactions: [],
      streakDays: 3,
      streakClaimedToday: false,
      claimDailyStreak: () => ({ coins: 100, message: '' }),
      spinAvailable: true,
      spinWheel: async () => ({
        id: '1',
        label: '500 COINS',
        type: 'coins',
        value: '500',
        description: '',
        color: '#eabf00',
      }),
      lastSpinReward: null,
      challenges: DEFAULT_CHALLENGES,
      claimChallengeReward: () => {},
      updateChallengeProgress: () => {},
      achievements: DEFAULT_ACHIEVEMENTS,
      referralCode: 'VIBE-DEMO',
      referralCount: 2,
      referralCoinsEarned: 1000,
      simulateFriendReferral: () => ({ friendName: 'Friend', coinsEarned: 500 }),
      redeemCoinsForCoupon: () => true,
      redeemedCoupons: [],
      isRewardsModalOpen: false,
      setIsRewardsModalOpen: () => {},
      openRewardsModal: () => {},
      isSpinModalOpen: false,
      setIsSpinModalOpen: () => {},
      awardCoins: () => {},
      birthdayClaimed: false,
      festivalClaimed: false,
      anniversaryClaimed: false,
      claimSpecialReward: () => {},
    };
  }
  return context;
};

const DEFAULT_CHALLENGES: IChallenge[] = [
  {
    id: 'c1',
    title: 'Streetwear Explorer',
    description: 'Browse 3 different oversized silhouettes or styles',
    rewardCoins: 75,
    progress: 2,
    target: 3,
    completed: false,
    claimed: false,
    category: 'shopping',
  },
  {
    id: 'c2',
    title: 'Wishlist Curator',
    description: 'Save 3 favorite streetwear items to your wishlist',
    rewardCoins: 100,
    progress: 1,
    target: 3,
    completed: false,
    claimed: false,
    category: 'engagement',
  },
  {
    id: 'c3',
    title: 'Cart Builder',
    description: 'Add 2 pieces to your bag ready for checkout',
    rewardCoins: 150,
    progress: 1,
    target: 2,
    completed: false,
    claimed: false,
    category: 'shopping',
  },
  {
    id: 'c4',
    title: 'Hype Spreader',
    description: 'Share your unique referral code with a friend',
    rewardCoins: 200,
    progress: 0,
    target: 1,
    completed: false,
    claimed: false,
    category: 'social',
  },
  {
    id: 'c5',
    title: 'Heavyweight Drop',
    description: 'Checkout with an order total of ₹999 or more',
    rewardCoins: 350,
    progress: 0,
    target: 1,
    completed: false,
    claimed: false,
    category: 'shopping',
  },
];

const DEFAULT_ACHIEVEMENTS: IAchievement[] = [
  {
    id: 'a1',
    title: 'First Drip',
    badgeEmoji: '👟',
    description: 'Welcome to VibeCart archive community',
    unlocked: true,
    tier: 'Bronze',
  },
  {
    id: 'a2',
    title: 'Streak Master (3 Days)',
    badgeEmoji: '🔥',
    description: 'Completed a 3-day daily engagement streak',
    unlocked: true,
    tier: 'Silver',
  },
  {
    id: 'a3',
    title: 'Vault Unlocked (7 Days)',
    badgeEmoji: '⚡',
    description: 'Maintained a 7-day shopping streak',
    unlocked: false,
    tier: 'Gold',
  },
  {
    id: 'a4',
    title: 'Vibe Icon (15 Days)',
    badgeEmoji: '👑',
    description: 'Reached elite 15-day streak milestone',
    unlocked: false,
    tier: 'Diamond',
  },
  {
    id: 'a5',
    title: 'Referral Boss',
    badgeEmoji: '🤝',
    description: 'Invited 3 friends to the community',
    unlocked: false,
    tier: 'Gold',
  },
];

export const GamificationProvider: FC = ({ children }) => {
  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vibe_coins');
      return saved ? Number(saved) : 450; // generous welcome bonus
    } catch {
      return 450;
    }
  });

  const [transactions, setTransactions] = useState<ICoinTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_coin_txs');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'tx-welcome',
              title: 'Welcome To VibeCart Bonus',
              amount: 250,
              date: 'Today',
              type: 'earned',
            },
            {
              id: 'tx-streak',
              title: '3-Day Shopping Streak Milestone',
              amount: 200,
              date: 'Today',
              type: 'earned',
            },
          ];
    } catch {
      return [];
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vibe_streak_days');
      return saved ? Number(saved) : 3;
    } catch {
      return 3;
    }
  });

  const [streakClaimedToday, setStreakClaimedToday] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('vibe_streak_claimed_date');
      const today = new Date().toDateString();
      return saved === today;
    } catch {
      return false;
    }
  });

  const [spinAvailable, setSpinAvailable] = useState<boolean>(true);
  const [lastSpinReward, setLastSpinReward] = useState<ISpinReward | null>(null);

  const [challenges, setChallenges] = useState<IChallenge[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_challenges');
      return saved ? JSON.parse(saved) : DEFAULT_CHALLENGES;
    } catch {
      return DEFAULT_CHALLENGES;
    }
  });

  const [achievements, setAchievements] = useState<IAchievement[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_achievements');
      return saved ? JSON.parse(saved) : DEFAULT_ACHIEVEMENTS;
    } catch {
      return DEFAULT_ACHIEVEMENTS;
    }
  });

  const [referralCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('vibe_referral_code');
      if (saved) return saved;
      const code = `VIBE-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem('vibe_referral_code', code);
      return code;
    } catch {
      return 'VIBE-GENZ';
    }
  });

  const [referralCount, setReferralCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vibe_referral_count');
      return saved ? Number(saved) : 2;
    } catch {
      return 2;
    }
  });

  const [referralCoinsEarned, setReferralCoinsEarned] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('vibe_referral_coins');
      return saved ? Number(saved) : 1000;
    } catch {
      return 1000;
    }
  });

  const [redeemedCoupons, setRedeemedCoupons] = useState<IRedeemedCoupon[]>(
    () => {
      try {
        const saved = localStorage.getItem('vibe_redeemed_coupons');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
  );

  const [birthdayClaimed, setBirthdayClaimed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vibe_birthday_claimed') === 'true';
    } catch {
      return false;
    }
  });

  const [festivalClaimed, setFestivalClaimed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vibe_festival_claimed') === 'true';
    } catch {
      return false;
    }
  });

  const [anniversaryClaimed, setAnniversaryClaimed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vibe_anniversary_claimed') === 'true';
    } catch {
      return false;
    }
  });

  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('vibe_coins', String(coins));
      localStorage.setItem('vibe_coin_txs', JSON.stringify(transactions));
      localStorage.setItem('vibe_streak_days', String(streakDays));
      localStorage.setItem('vibe_challenges', JSON.stringify(challenges));
      localStorage.setItem('vibe_achievements', JSON.stringify(achievements));
      localStorage.setItem('vibe_referral_count', String(referralCount));
      localStorage.setItem('vibe_referral_coins', String(referralCoinsEarned));
      localStorage.setItem(
        'vibe_redeemed_coupons',
        JSON.stringify(redeemedCoupons)
      );
    } catch {
      // storage unavailable
    }
  }, [
    coins,
    transactions,
    streakDays,
    challenges,
    achievements,
    referralCount,
    referralCoinsEarned,
    redeemedCoupons,
  ]);

  const awardCoins = useCallback((amount: number, reason: string) => {
    setCoins((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}-${Math.random()}`,
        title: reason,
        amount,
        date: 'Just now',
        type: 'earned',
      },
      ...prev,
    ]);
  }, []);

  const claimDailyStreak = useCallback(() => {
    if (streakClaimedToday) {
      return { coins: 0, message: "Already claimed today's streak reward!" };
    }

    const nextStreak = streakDays + 1;
    let bonusCoins = 100;
    let milestoneMsg = `Day ${nextStreak} streak verified! +${bonusCoins} coins!`;

    if (nextStreak === 7) {
      bonusCoins = 300;
      milestoneMsg = `🎉 7-DAY STREAK MILESTONE! +300 Coins & Silver Badge unlocked!`;
      setAchievements((prev) =>
        prev.map((a) => (a.id === 'a3' ? { ...a, unlocked: true } : a))
      );
    } else if (nextStreak === 15) {
      bonusCoins = 750;
      milestoneMsg = `👑 15-DAY STREAK ELITE! +750 Coins & Diamond Tier unlocked!`;
      setAchievements((prev) =>
        prev.map((a) => (a.id === 'a4' ? { ...a, unlocked: true } : a))
      );
    } else if (nextStreak === 30) {
      bonusCoins = 2000;
      milestoneMsg = `💎 30-DAY LEGENDARY STREAK! +2000 Coins!`;
    }

    setStreakDays(nextStreak);
    setStreakClaimedToday(true);
    localStorage.setItem('vibe_streak_claimed_date', new Date().toDateString());
    awardCoins(bonusCoins, `Daily Streak Day ${nextStreak}`);

    return { coins: bonusCoins, message: milestoneMsg };
  }, [awardCoins, streakClaimedToday, streakDays]);

  const spinWheel = useCallback((): Promise<ISpinReward> => {
    return new Promise((resolve) => {
      const rewards: ISpinReward[] = [
        {
          id: 'sp-1',
          label: '500 COINS',
          type: 'coins',
          value: '500',
          description: '+500 VibeCoins credited to your wallet!',
          color: '#eabf00',
        },
        {
          id: 'sp-2',
          label: '25% OFF',
          type: 'coupon',
          value: 'SPIN25',
          description: 'Flat 25% discount coupon on your next order!',
          color: '#ff3b30',
        },
        {
          id: 'sp-3',
          label: '₹200 CASHBACK',
          type: 'cashback',
          value: '₹200',
          description: 'Simulated instant cashback added to wallet balance!',
          color: '#10b981',
        },
        {
          id: 'sp-4',
          label: 'FREE SHIPPING',
          type: 'shipping',
          value: 'FREESHIPPASS',
          description: 'Zero shipping fee pass on all orders with no minimum!',
          color: '#3b82f6',
        },
        {
          id: 'sp-5',
          label: 'MYSTERY GIFT',
          type: 'gift',
          value: 'STREETGIFT',
          description: 'Free Streetwear Dad Cap or Chain added with next order!',
          color: '#a855f7',
        },
        {
          id: 'sp-6',
          label: '250 COINS',
          type: 'coins',
          value: '250',
          description: '+250 Bonus Coins added instantly!',
          color: '#ccff00',
        },
      ];

      const picked = rewards[Math.floor(Math.random() * rewards.length)];

      if (picked.type === 'coins') {
        awardCoins(Number(picked.value), `Spin & Win Prize: ${picked.label}`);
      } else if (picked.type === 'coupon') {
        setRedeemedCoupons((prev) => [
          {
            code: picked.value,
            discount: picked.label,
            description: picked.description,
            expires: 'Valid for 7 days',
          },
          ...prev,
        ]);
      }

      setLastSpinReward(picked);
      setSpinAvailable(false);
      resolve(picked);
    });
  }, [awardCoins]);

  const updateChallengeProgress = useCallback(
    (id: string, delta = 1) => {
      setChallenges((prev) =>
        prev.map((c) => {
          if (c.id === id && !c.completed) {
            const newProg = Math.min(c.target, c.progress + delta);
            return {
              ...c,
              progress: newProg,
              completed: newProg >= c.target,
            };
          }
          return c;
        })
      );
    },
    []
  );

  const claimChallengeReward = useCallback(
    (id: string) => {
      setChallenges((prev) =>
        prev.map((c) => {
          if (c.id === id && c.completed && !c.claimed) {
            awardCoins(c.rewardCoins, `Challenge Completed: ${c.title}`);
            return { ...c, claimed: true };
          }
          return c;
        })
      );
    },
    [awardCoins]
  );

  const simulateFriendReferral = useCallback(() => {
    const friendNames = ['Rohan', 'Aanya', 'Kabir', 'Tanvi', 'Ishaan', 'Meera'];
    const randomFriend =
      friendNames[Math.floor(Math.random() * friendNames.length)];
    const bonus = 500;

    setReferralCount((prev) => prev + 1);
    setReferralCoinsEarned((prev) => prev + bonus);
    awardCoins(bonus, `Referral Reward: ${randomFriend} joined and shopped!`);

    return { friendName: randomFriend, coinsEarned: bonus };
  }, [awardCoins]);

  const redeemCoinsForCoupon = useCallback(
    (couponCode: string, coinCost: number, discountLabel: string) => {
      if (coins < coinCost) {
        return false;
      }

      setCoins((prev) => prev - coinCost);
      setTransactions((prev) => [
        {
          id: `tx-redeem-${Date.now()}`,
          title: `Redeemed ${couponCode} (${discountLabel})`,
          amount: -coinCost,
          date: 'Just now',
          type: 'redeemed',
        },
        ...prev,
      ]);

      setRedeemedCoupons((prev) => [
        {
          code: couponCode,
          discount: discountLabel,
          description: `Enjoy ${discountLabel} discount on your next order!`,
          expires: 'Valid for 30 days',
        },
        ...prev,
      ]);

      return true;
    },
    [coins]
  );

  const claimSpecialReward = useCallback(
    (type: 'birthday' | 'festival' | 'anniversary') => {
      if (type === 'birthday' && !birthdayClaimed) {
        setBirthdayClaimed(true);
        localStorage.setItem('vibe_birthday_claimed', 'true');
        awardCoins(500, '🎂 Happy Birthday Reward: 500 Coins + 25% Coupon');
        setRedeemedCoupons((prev) => [
          {
            code: 'BDAY25',
            discount: '25% OFF',
            description: 'Birthday Exclusive 25% Off on Any Silhouette',
            expires: 'Valid for 14 days',
          },
          ...prev,
        ]);
      } else if (type === 'festival' && !festivalClaimed) {
        setFestivalClaimed(true);
        localStorage.setItem('vibe_festival_claimed', 'true');
        awardCoins(750, '🪔 Festive Cyber Drop Pass: 750 Coins + ₹300 Coupon');
        setRedeemedCoupons((prev) => [
          {
            code: 'FESTIVE300',
            discount: '₹300 OFF',
            description: 'Flat ₹300 Festive discount on orders above ₹1299',
            expires: 'Valid for 7 days',
          },
          ...prev,
        ]);
      } else if (type === 'anniversary' && !anniversaryClaimed) {
        setAnniversaryClaimed(true);
        localStorage.setItem('vibe_anniversary_claimed', 'true');
        awardCoins(400, '🎉 Vibe Anniversary Gift: 400 Coins + Free Gift');
      }
    },
    [anniversaryClaimed, awardCoins, birthdayClaimed, festivalClaimed]
  );

  const openRewardsModal = useCallback((_tab?: string) => {
    setIsRewardsModalOpen(true);
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        coins,
        transactions,
        streakDays,
        streakClaimedToday,
        claimDailyStreak,
        spinAvailable,
        spinWheel,
        lastSpinReward,
        challenges,
        claimChallengeReward,
        updateChallengeProgress,
        achievements,
        referralCode,
        referralCount,
        referralCoinsEarned,
        simulateFriendReferral,
        redeemCoinsForCoupon,
        redeemedCoupons,
        isRewardsModalOpen,
        setIsRewardsModalOpen,
        openRewardsModal,
        isSpinModalOpen,
        setIsSpinModalOpen,
        awardCoins,
        birthdayClaimed,
        festivalClaimed,
        anniversaryClaimed,
        claimSpecialReward,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export default GamificationProvider;
