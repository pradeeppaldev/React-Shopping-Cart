import React, { useState } from 'react';
import { useGamification, ISpinReward } from 'contexts/gamification-context';
import { useUser } from 'contexts/user-context';
import * as S from './style';

const WHEEL_SEGMENTS = [
  { label: '500 COINS', color: '#eabf00', textColor: '#000' },
  { label: '25% OFF', color: '#ff3b30', textColor: '#fff' },
  { label: '₹200 CASHBACK', color: '#10b981', textColor: '#fff' },
  { label: 'FREE SHIPPING', color: '#3b82f6', textColor: '#fff' },
  { label: 'MYSTERY GIFT', color: '#a855f7', textColor: '#fff' },
  { label: '250 COINS', color: '#ccff00', textColor: '#000' },
];

const SpinAndWinModal: React.FC = () => {
  const { isSpinModalOpen, setIsSpinModalOpen, spinWheel } = useGamification();
  const { showToast } = useUser();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonReward, setWonReward] = useState<ISpinReward | null>(null);

  if (!isSpinModalOpen) return null;

  const handleSpin = async () => {
    if (spinning) return;
    setSpinning(true);
    setWonReward(null);

    // Pick random target segment between 0 and 5
    const targetIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    // Extra 5 full rotations + segment center offset
    const randomOffset = (segmentAngle / 2) + targetIndex * segmentAngle;
    const totalRotation = rotation + 1800 + (360 - (rotation % 360)) + randomOffset;

    setRotation(totalRotation);

    setTimeout(async () => {
      const reward = await spinWheel();
      setWonReward(reward);
      setSpinning(false);
      showToast(`Won ${reward.label}! Credited to your rewards vault.`, 'reward', '🎡');
    }, 3800);
  };

  const handleClose = () => {
    if (spinning) return;
    setIsSpinModalOpen(false);
    setWonReward(null);
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={handleClose} disabled={spinning}>
          ✕
        </S.CloseButton>

        <S.Header>
          <span className="badge">🎡 DAILY LUCKY DROP</span>
          <h2>SPIN & WIN REWARDS</h2>
          <p>
            Spin the streetwear wheel once daily for bonus coins, discount coupons,
            cashback passes, or free mystery merch!
          </p>
        </S.Header>

        {/* The Wheel */}
        <S.WheelWrapper>
          <S.Pointer />
          <S.Wheel rotation={rotation} spinning={spinning}>
            {WHEEL_SEGMENTS.map((seg, i) => {
              const deg = i * (360 / WHEEL_SEGMENTS.length);
              return (
                <S.Segment
                  key={i}
                  degree={deg}
                  color={seg.color}
                  textColor={seg.textColor}
                >
                  <span className="text">{seg.label}</span>
                </S.Segment>
              );
            })}
          </S.Wheel>

          <S.CenterButton onClick={handleSpin} disabled={spinning}>
            {spinning ? 'SPINNING...' : 'SPIN'}
          </S.CenterButton>
        </S.WheelWrapper>

        {/* Win Reward Modal Overlay / Pop-up */}
        {wonReward && (
          <S.WinCard>
            <span className="confetti">🎉 ⚡ 🪙</span>
            <h3>CONGRATULATIONS!</h3>
            <S.RewardPill>{wonReward.label}</S.RewardPill>
            <p>{wonReward.description}</p>
            <S.ClaimButton onClick={handleClose}>CLAIM & SHOP</S.ClaimButton>
          </S.WinCard>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default SpinAndWinModal;
