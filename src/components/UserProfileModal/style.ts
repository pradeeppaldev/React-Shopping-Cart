import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  background: #0d0f13;
  border: 1px solid #232733;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 255, 136, 0.08);
  display: flex;
  flex-direction: column;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 24px 28px;
  background: #12151c;
  border-bottom: 1px solid #222633;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .user-badge {
    display: flex;
    align-items: center;
    gap: 16px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #00ff88;
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
    }

    .names {
      h2 {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 800;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 8px;

        .tier-tag {
          font-size: 0.65rem;
          background: linear-gradient(135deg, #ffd700 0%, #ff8800 100%);
          color: #000;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 10px;
          letter-spacing: 0.5px;
        }
      }

      p {
        margin: 4px 0 0;
        font-size: 0.85rem;
        color: #8892a0;
      }
    }
  }

  .close-btn {
    background: #1a1e27;
    border: 1px solid #2d3342;
    color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: #ff0055;
      border-color: #ff0055;
      transform: rotate(90deg);
    }
  }
`;

export const TabNav = styled.div`
  display: flex;
  background: #0f1218;
  border-bottom: 1px solid #1f232e;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  min-width: 130px;
  padding: 14px 18px;
  background: ${(props) => (props.active ? '#161a23' : 'transparent')};
  color: ${(props) => (props.active ? '#00ff88' : '#8892a0')};
  border: none;
  border-bottom: 2px solid ${(props) => (props.active ? '#00ff88' : 'transparent')};
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #fff;
    background: #141720;
  }
`;

export const ContentBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 26px 28px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #232733;
    border-radius: 4px;
  }

  @media (max-width: 600px) {
    padding: 18px 16px;
  }
`;

/* Profile Tab */
export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #8892a0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input,
  textarea,
  select {
    background: #141720;
    border: 1px solid #232733;
    border-radius: 10px;
    padding: 12px 14px;
    color: #fff;
    font-family: inherit;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #00ff88;
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

export const SaveButton = styled.button`
  grid-column: 1 / -1;
  background: #00ff88;
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #00dd77;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 255, 136, 0.3);
  }
`;

/* Orders Tab */
export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderCard = styled.div`
  background: #12151d;
  border: 1px solid #222634;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #31384c;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1a1e29;
    padding-bottom: 12px;

    .id-date {
      h4 {
        margin: 0;
        color: #fff;
        font-size: 1rem;
        font-weight: 800;
      }
      span {
        font-size: 0.78rem;
        color: #778;
      }
    }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 8px;
      background: rgba(0, 255, 136, 0.15);
      color: #00ff88;
      border: 1px solid rgba(0, 255, 136, 0.3);
    }
  }

  .order-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .order-item-row {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
      background: #181c25;
    }

    .item-info {
      flex: 1;
      h5 {
        margin: 0;
        font-size: 0.9rem;
        color: #eee;
      }
      p {
        margin: 2px 0 0;
        font-size: 0.78rem;
        color: #888;
      }
    }

    .item-price {
      font-weight: 700;
      color: #fff;
      font-size: 0.9rem;
    }
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #1a1e29;
    padding-top: 12px;
    font-size: 0.85rem;

    .meta {
      color: #889;
      strong {
        color: #ffd700;
      }
    }

    .actions {
      display: flex;
      gap: 10px;

      .reorder-btn {
        background: #1b202c;
        border: 1px solid #2d3447;
        color: #00ff88;
        font-weight: 700;
        font-size: 0.8rem;
        padding: 6px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #00ff88;
          color: #000;
          border-color: #00ff88;
        }
      }
    }
  }
`;

/* Rewards & Streaks Tab */
export const RewardsSummaryCard = styled.div`
  background: linear-gradient(135deg, #181404 0%, #291e03 100%);
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  .balance-wrap {
    display: flex;
    align-items: center;
    gap: 16px;

    .coin-icon {
      font-size: 2.8rem;
      animation: bounce 2s infinite ease-in-out;
    }

    h3 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 900;
      color: #ffd700;
      text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
    }

    p {
      margin: 4px 0 0;
      font-size: 0.85rem;
      color: #d1b873;
    }
  }

  .open-vault-btn {
    background: #ffd700;
    color: #000;
    border: none;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #ffea70;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

export const StreakCard = styled.div`
  background: #12151e;
  border: 1px solid #212635;
  border-radius: 16px;
  padding: 22px;
  margin-bottom: 24px;

  .streak-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h4 {
      margin: 0;
      color: #fff;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      font-size: 0.82rem;
      font-weight: 700;
      color: #ff5500;
    }
  }

  .progress-bar-bg {
    height: 10px;
    background: #1a1e29;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 14px;

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff5500 0%, #ffd700 100%);
      border-radius: 10px;
      transition: width 0.5s ease;
    }
  }

  .streak-milestones {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    .milestone {
      background: #161a25;
      border: 1px solid #232838;
      border-radius: 10px;
      padding: 10px;
      text-align: center;

      &.achieved {
        border-color: #00ff88;
        background: rgba(0, 255, 136, 0.08);
      }

      strong {
        display: block;
        font-size: 0.85rem;
        color: #fff;
      }

      span {
        font-size: 0.72rem;
        color: #ffd700;
      }
    }
  }
`;

export const ReferralBox = styled.div`
  background: #12151e;
  border: 1px solid #212635;
  border-radius: 16px;
  padding: 22px;

  h4 {
    margin: 0 0 6px 0;
    font-size: 1.05rem;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin: 0 0 16px 0;
    font-size: 0.85rem;
    color: #8892a0;
  }

  .code-row {
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      background: #171b26;
      border: 1px dashed #323a4f;
      border-radius: 10px;
      color: #00ff88;
      font-family: monospace;
      font-size: 1.1rem;
      font-weight: 700;
      padding: 10px 14px;
      letter-spacing: 1px;
    }

    button {
      background: #00ff88;
      color: #000;
      border: none;
      font-weight: 800;
      padding: 0 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #00dd77;
      }
    }
  }
`;

/* Preferences Tab */
export const PreferencesWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .pref-section {
    h4 {
      margin: 0 0 6px 0;
      font-size: 1rem;
      color: #fff;
    }

    p {
      margin: 0 0 12px 0;
      font-size: 0.82rem;
      color: #778;
    }

    .options-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
`;

export const OptionPill = styled.button<{ selected: boolean }>`
  background: ${(props) => (props.selected ? '#00ff88' : '#151924')};
  color: ${(props) => (props.selected ? '#000' : '#aaa')};
  border: 1px solid ${(props) => (props.selected ? '#00ff88' : '#252a38')};
  border-radius: 20px;
  padding: 8px 16px;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #00ff88;
    color: #fff;
  }
`;
