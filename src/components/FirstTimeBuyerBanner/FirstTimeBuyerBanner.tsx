import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useUser } from 'contexts/user-context';

const BannerWrapper = styled.div`
  max-width: 1360px;
  margin: 0 auto 24px;
  padding: 0 20px;
`;

const BannerCard = styled.div`
  background: radial-gradient(circle at 10% 50%, rgba(204, 255, 0, 0.15) 0%, rgba(20, 22, 29, 0.98) 70%),
    linear-gradient(90deg, #181c26 0%, #11131a 100%);
  border: 1px solid rgba(204, 255, 0, 0.35);
  border-radius: 14px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  .badge {
    background: #ccff00;
    color: #000;
    font-size: 0.7rem;
    font-weight: 900;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  .text {
    strong {
      color: #ffffff;
      font-size: 0.9rem;
      margin-right: 6px;
    }

    span {
      color: #a0a6b5;
      font-size: 0.82rem;
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .code-pill {
    background: #0f1117;
    border: 1px dashed #ccff00;
    color: #ccff00;
    font-size: 0.82rem;
    font-weight: 900;
    padding: 6px 12px;
    border-radius: 6px;
    letter-spacing: 0.08em;
  }
`;

const CopyButton = styled.button`
  background: #ccff00;
  color: #000000;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 7px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2ff4f;
  }
`;

const FirstTimeBuyerBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useUser();

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText('WELCOME200');
      setCopied(true);
      showToast('Code WELCOME200 copied to clipboard! Flat ₹200 OFF first order.', 'reward', '🎟️');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      showToast('Code WELCOME200 copied to clipboard!', 'reward', '🎟️');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <BannerWrapper>
      <BannerCard>
        <Left>
          <span className="badge">WELCOME OFFER</span>
          <div className="text">
            <strong>FIRST-TIME BUYER?</strong>
            <span>Get flat ₹200 OFF on your first streetwear drop (orders above ₹999) + 250 Bonus Coins!</span>
          </div>
        </Left>
        <Right>
          <span className="code-pill">WELCOME200</span>
          <CopyButton onClick={handleCopy}>
            {copied ? '✓ COPIED' : 'COPY CODE'}
          </CopyButton>
        </Right>
      </BannerCard>
    </BannerWrapper>
  );
};

export default FirstTimeBuyerBanner;
