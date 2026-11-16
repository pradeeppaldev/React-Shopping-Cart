import styled from 'styled-components/macro';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 10, 14, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background: #14161d;
  border: 1px solid #282c38;
  border-radius: 24px;
  max-width: 860px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.25s ease-out;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #282c38;
    border-radius: 3px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #1e222c;
  border: 1px solid #2e3442;
  color: #a0a6b5;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.95rem;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    border-color: #eabf00;
  }
`;

export const CoinHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 32px 24px;
  background: linear-gradient(135deg, #1b1e28 0%, #101217 100%);
  border-bottom: 1px solid #232733;
  gap: 24px;
  flex-wrap: wrap;

  .left {
    .badge {
      display: inline-block;
      background: rgba(234, 191, 0, 0.15);
      border: 1px solid rgba(234, 191, 0, 0.4);
      color: #eabf00;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      padding: 3px 10px;
      border-radius: 999px;
      margin-bottom: 8px;
    }

    h2 {
      margin: 0 0 10px;
      font-size: 1.6rem;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.02em;
    }

    .balance-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 4px;

      .coin-icon {
        font-size: 2rem;
      }

      .balance {
        font-size: 2.2rem;
        font-weight: 900;
        color: #eabf00;
      }

      .unit {
        font-size: 1rem;
        font-weight: 700;
        color: #a0a6b5;
      }
    }

    .worth {
      margin: 0;
      font-size: 0.8rem;
      color: #10b981;
      font-weight: 600;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

export const SpinTriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #2a2205 0%, #151307 100%);
  border: 1px solid #eabf00;
  border-radius: 14px;
  padding: 12px 20px;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s ease;
  box-shadow: 0 6px 18px rgba(234, 191, 0, 0.2);

  .wheel {
    font-size: 1.8rem;
  }

  div {
    display: flex;
    flex-direction: column;
    text-align: left;

    strong {
      font-size: 0.92rem;
      font-weight: 900;
      color: #eabf00;
      letter-spacing: 0.05em;
    }

    small {
      font-size: 0.72rem;
      color: #c0c6d4;
    }
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(234, 191, 0, 0.35);
  }
`;

export const TabsRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 32px 0;
  border-bottom: 1px solid #232733;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ITabBtn {
  active?: boolean;
}

export const TabBtn = styled.button<ITabBtn>`
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#eabf00' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : '#8890a4')};
  padding: 10px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const SectionBody = styled.div`
  padding: 28px 32px 36px;
`;

export const SectionIntro = styled.div`
  margin-bottom: 20px;

  h3 {
    margin: 0 0 4px;
    font-size: 1.15rem;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #a0a6b5;
  }
`;

export const CouponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const CouponCard = styled.div`
  background: #101217;
  border: 1px solid #232733;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .discount {
      font-size: 1.1rem;
      font-weight: 900;
      color: #eabf00;
    }

    .cost {
      font-size: 0.78rem;
      font-weight: 800;
      color: #ccff00;
      background: rgba(204, 255, 0, 0.1);
      padding: 3px 8px;
      border-radius: 4px;
    }
  }

  .desc {
    margin: 0 0 14px;
    font-size: 0.8rem;
    color: #a0a6b5;
    line-height: 1.4;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid #1f232e;

    .code {
      font-size: 0.75rem;
      color: #687082;

      b {
        color: #ffffff;
      }
    }
  }
`;

export const RedeemButton = styled.button`
  background: ${({ disabled }) => (disabled ? '#1f232e' : '#eabf00')};
  color: ${({ disabled }) => (disabled ? '#555e70' : '#000000')};
  font-weight: 800;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #ffdf5a;
  }
`;

export const ActiveCouponsBox = styled.div`
  margin-top: 24px;
  background: #0f1117;
  border: 1px solid #232733;
  border-radius: 14px;
  padding: 18px;

  h4 {
    margin: 0 0 12px;
    font-size: 0.9rem;
    font-weight: 800;
    color: #10b981;
  }

  .coupons-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

export const ActiveCouponItem = styled.div`
  background: #14161d;
  border: 1px dashed #10b981;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;

  .code {
    font-size: 0.82rem;
    font-weight: 900;
    color: #ffffff;
  }

  .disc {
    font-size: 0.75rem;
    font-weight: 800;
    color: #10b981;
  }

  .exp {
    font-size: 0.65rem;
    color: #687082;
  }
`;

export const StreakHero = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  background: radial-gradient(circle at 10% 20%, rgba(255, 59, 48, 0.15) 0%, rgba(20, 22, 29, 0.98) 70%),
    linear-gradient(135deg, #181b24 0%, #101217 100%);
  border: 1px solid #2e3444;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }

  .fire-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 110px;

    .flame {
      font-size: 3rem;
    }

    .days {
      font-size: 2.4rem;
      font-weight: 900;
      color: #ff3b30;
      line-height: 1;
    }

    .label {
      font-size: 0.68rem;
      font-weight: 800;
      color: #a0a6b5;
      letter-spacing: 0.1em;
    }
  }

  .action-col {
    h3 {
      margin: 0 0 6px;
      font-size: 1.2rem;
      font-weight: 900;
      color: #ffffff;
    }

    p {
      margin: 0 0 14px;
      font-size: 0.85rem;
      color: #a0a6b5;
      line-height: 1.5;
    }

    .status-msg {
      margin: 8px 0 0;
      font-size: 0.8rem;
      font-weight: 700;
      color: #10b981;
    }
  }
`;

export const CheckInButton = styled.button`
  background: ${({ disabled }) => (disabled ? '#1f232e' : '#ff3b30')};
  color: ${({ disabled }) => (disabled ? '#687082' : '#ffffff')};
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #ff5247;
    transform: translateY(-1px);
  }
`;

export const MilestonesTracker = styled.div`
  h4 {
    margin: 0 0 12px;
    font-size: 0.85rem;
    font-weight: 800;
    color: #a0a6b5;
    letter-spacing: 0.08em;
  }
`;

export const MilestoneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 680px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface IMilestoneCard {
  reached?: boolean;
}

export const MilestoneCard = styled.div<IMilestoneCard>`
  background: ${({ reached }) => (reached ? '#171a22' : '#0f1117')};
  border: 1px solid ${({ reached }) => (reached ? '#ff3b30' : '#232733')};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  text-align: center;

  .day {
    font-size: 0.72rem;
    font-weight: 900;
    color: ${({ reached }) => (reached ? '#ff3b30' : '#687082')};
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }

  .gift {
    font-size: 0.82rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .status {
    font-size: 0.65rem;
    font-weight: 700;
    color: ${({ reached }) => (reached ? '#10b981' : '#687082')};
  }
`;

export const ChallengesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ChallengeItem = styled.div`
  background: #101217;
  border: 1px solid #232733;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .left {
    flex: 1;

    strong {
      font-size: 0.88rem;
      color: #ffffff;
      display: block;
      margin-bottom: 2px;
    }

    p {
      margin: 0 0 8px;
      font-size: 0.78rem;
      color: #a0a6b5;
    }

    .progress-bar {
      width: 100%;
      max-width: 280px;
      height: 6px;
      background: #1e222c;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 4px;

      .fill {
        height: 100%;
        background: #eabf00;
        border-radius: 3px;
      }
    }

    .track {
      font-size: 0.68rem;
      color: #687082;
      font-weight: 600;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;

    .reward {
      font-size: 0.85rem;
      font-weight: 800;
      color: #eabf00;
    }
  }
`;

export const ClaimedPill = styled.span`
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
`;

export const ChallengeClaimButton = styled.button`
  background: ${({ disabled }) => (disabled ? '#1a1d26' : '#eabf00')};
  color: ${({ disabled }) => (disabled ? '#505666' : '#000000')};
  font-weight: 800;
  font-size: 0.75rem;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background: #ffdf5a;
  }
`;

export const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface IBadgeCard {
  unlocked?: boolean;
}

export const BadgeCard = styled.div<IBadgeCard>`
  background: ${({ unlocked }) => (unlocked ? '#141720' : '#0d0f14')};
  border: 1px solid ${({ unlocked }) => (unlocked ? '#eabf00' : '#1f232e')};
  opacity: ${({ unlocked }) => (unlocked ? '1' : '0.4')};
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .emoji {
    font-size: 2rem;
    margin-bottom: 6px;
  }

  strong {
    font-size: 0.78rem;
    color: #ffffff;
    margin-bottom: 4px;
  }

  p {
    margin: 0 0 6px;
    font-size: 0.65rem;
    color: #a0a6b5;
    line-height: 1.3;
  }

  .tier {
    font-size: 0.6rem;
    font-weight: 800;
    color: #eabf00;
    letter-spacing: 0.08em;
  }
`;

export const OccasionsRewardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface IOccRewardCard {
  claimed?: boolean;
}

export const OccasionRewardCard = styled.div<IOccRewardCard>`
  background: #101217;
  border: 1px solid ${({ claimed }) => (claimed ? '#10b981' : '#232733')};
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    font-size: 2.4rem;
    margin-bottom: 8px;
  }

  h4 {
    margin: 0 0 6px;
    font-size: 0.95rem;
    font-weight: 900;
    color: #ffffff;
  }

  p {
    margin: 0 0 16px;
    font-size: 0.8rem;
    color: #a0a6b5;
    line-height: 1.4;
  }
`;

export const SpecialClaimBtn = styled.button`
  background: ${({ disabled }) => (disabled ? '#1a1d26' : '#ccff00')};
  color: ${({ disabled }) => (disabled ? '#687082' : '#000000')};
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 9px 18px;
  border-radius: 8px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-top: auto;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #e2ff4f;
    transform: translateY(-1px);
  }
`;

export const ReferHero = styled.div`
  text-align: center;

  h3 {
    margin: 0 0 8px;
    font-size: 1.3rem;
    font-weight: 900;
    color: #ffffff;
  }

  p {
    margin: 0 auto 20px;
    max-width: 500px;
    font-size: 0.88rem;
    color: #a0a6b5;
    line-height: 1.5;
  }
`;

export const ReferCodeBox = styled.div`
  background: #0f1117;
  border: 1px solid #282c38;
  border-radius: 14px;
  padding: 18px 24px;
  max-width: 440px;
  margin: 0 auto 20px;

  .code-label {
    font-size: 0.68rem;
    font-weight: 800;
    color: #687082;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 8px;
  }

  .code-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .code {
      font-size: 1.4rem;
      font-weight: 900;
      color: #eabf00;
      letter-spacing: 0.1em;
    }
  }
`;

export const CopyBtn = styled.button`
  background: #eabf00;
  color: #000;
  font-weight: 800;
  font-size: 0.82rem;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffdf5a;
  }
`;

export const SimulateReferralBox = styled.div`
  background: #141720;
  border: 1px dashed #eabf00;
  border-radius: 12px;
  padding: 16px;
  max-width: 440px;
  margin: 0 auto 24px;
  text-align: center;

  .title {
    font-size: 0.8rem;
    font-weight: 800;
    color: #eabf00;
    display: block;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.75rem;
    color: #a0a6b5;
    margin-bottom: 12px;
  }
`;

export const SimulateBtn = styled.button`
  background: #10b981;
  color: #fff;
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  padding: 9px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #18d092;
    transform: translateY(-1px);
  }
`;

export const FeedbackMsg = styled.div`
  margin-top: 10px;
  font-size: 0.78rem;
  color: #ccff00;
  font-weight: 700;
  line-height: 1.4;
`;

export const ReferralStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 500px;
  margin: 0 auto;

  .stat {
    background: #0f1117;
    border: 1px solid #232733;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 1.3rem;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 2px;
    }

    small {
      font-size: 0.65rem;
      font-weight: 800;
      color: #687082;
      letter-spacing: 0.05em;
    }
  }
`;

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface ITxItem {
  type: 'earned' | 'redeemed';
}

export const TxItem = styled.div<ITxItem>`
  background: #101217;
  border: 1px solid #232733;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    strong {
      font-size: 0.85rem;
      color: #ffffff;
      display: block;
      margin-bottom: 2px;
    }

    small {
      font-size: 0.7rem;
      color: #687082;
    }
  }

  .right {
    .amount {
      font-size: 0.95rem;
      font-weight: 800;
      color: ${({ type }) => (type === 'earned' ? '#10b981' : '#ff3b30')};
    }
  }
`;
