import styled from 'styled-components/macro';

export const DiscoverySection = styled.section`
  max-width: 1360px;
  margin: 0 auto 48px;
  padding: 0 20px;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const SectionBadge = styled.span`
  display: inline-block;
  background: rgba(204, 255, 0, 0.1);
  border: 1px solid rgba(204, 255, 0, 0.3);
  color: #ccff00;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 600px;
  font-size: 0.95rem;
  color: #a0a6b5;
`;

export const NavigationTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow-x: auto;
  padding: 8px 0 24px;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`;

interface INavTab {
  active?: boolean;
}

export const NavTabButton = styled.button<INavTab>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ active }) => (active ? '#eabf00' : '#14161d')};
  color: ${({ active }) => (active ? '#000000' : '#ffffff')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #eabf00;
    transform: translateY(-1px);
  }
`;

export const TabPanel = styled.div`
  background: #14161d;
  border: 1px solid #232733;
  border-radius: 20px;
  padding: 28px;
  animation: fadeIn 0.25s ease-out;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const PanelHeader = styled.div`
  margin-bottom: 20px;
  text-align: left;

  h3 {
    margin: 0 0 6px;
    font-size: 1.25rem;
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

export const PillsGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

interface IBudgetPill {
  active?: boolean;
}

export const BudgetPill = styled.button<IBudgetPill>`
  background: ${({ active }) => (active ? '#eabf00' : '#1a1d26')};
  color: ${({ active }) => (active ? '#000000' : '#ffffff')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#282c38')};
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.88rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: #eabf00;
    transform: translateY(-1px);
  }
`;

export const CustomPriceForm = styled.form`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #0f1117;
  border: 1px solid #282c38;
  border-radius: 12px;
  padding: 12px 18px;
  flex-wrap: wrap;

  .label {
    font-size: 0.8rem;
    font-weight: 800;
    color: #a0a6b5;
    letter-spacing: 0.05em;
  }

  .to {
    color: #687082;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .input-group {
    display: flex;
    align-items: center;
    background: #1a1d26;
    border: 1px solid #282c38;
    border-radius: 8px;
    padding: 0 10px;

    .currency {
      color: #eabf00;
      font-weight: 700;
      font-size: 0.85rem;
    }

    input {
      background: none;
      border: none;
      color: #ffffff;
      padding: 8px 6px;
      width: 70px;
      font-size: 0.85rem;
      font-weight: 700;
      outline: none;
    }
  }
`;

export const ApplyButton = styled.button`
  background: #eabf00;
  color: #000000;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 9px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffdf5a;
  }
`;

export const ResetFilterButton = styled.button`
  background: none;
  border: 1px solid #282c38;
  color: #a0a6b5;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    border-color: #ffffff;
  }
`;

export const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

interface IMoodCard {
  active?: boolean;
}

export const MoodCard = styled.div<IMoodCard>`
  background: ${({ active }) => (active ? '#1f232e' : '#101217')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  .emoji {
    font-size: 1.8rem;
    margin-bottom: 8px;
    display: inline-block;
  }

  h4 {
    margin: 0 0 4px;
    font-size: 0.95rem;
    font-weight: 800;
    color: ${({ active }) => (active ? '#eabf00' : '#ffffff')};
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: #a0a6b5;
    line-height: 1.4;
  }

  &:hover {
    border-color: #eabf00;
    transform: translateY(-2px);
  }
`;

export const OccasionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

interface IOccasionCard {
  active?: boolean;
}

export const OccasionCard = styled.div<IOccasionCard>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: ${({ active }) => (active ? '#1f232e' : '#101217')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  .emoji {
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .text {
    h4 {
      margin: 0 0 4px;
      font-size: 0.92rem;
      font-weight: 800;
      color: ${({ active }) => (active ? '#eabf00' : '#ffffff')};
    }

    .outfit {
      margin: 0;
      font-size: 0.72rem;
      color: #a0a6b5;
      line-height: 1.35;

      b {
        color: #ccff00;
      }
    }
  }

  &:hover {
    border-color: #eabf00;
    transform: translateY(-2px);
  }
`;

export const DealsBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: radial-gradient(circle at 10% 20%, rgba(255, 59, 48, 0.2) 0%, rgba(20, 22, 29, 0.98) 70%),
    linear-gradient(135deg, #1b1e26 0%, #101217 100%);
  border: 1px solid #33394a;
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 24px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  .left {
    .badge {
      display: inline-block;
      background: #ff3b30;
      color: #fff;
      font-size: 0.68rem;
      font-weight: 900;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
      letter-spacing: 0.05em;
    }

    h3 {
      margin: 0 0 6px;
      font-size: 1.4rem;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.02em;
    }

    p {
      margin: 0;
      font-size: 0.88rem;
      color: #c0c6d4;

      b {
        color: #eabf00;
      }
    }
  }
`;

export const CountdownBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .colon {
    font-size: 1.2rem;
    font-weight: 900;
    color: #eabf00;
  }

  .time-block {
    background: #0f1117;
    border: 1px solid #282c38;
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 48px;

    span {
      font-size: 1.3rem;
      font-weight: 900;
      color: #ffffff;
    }

    small {
      font-size: 0.6rem;
      font-weight: 800;
      color: #687082;
      letter-spacing: 0.08em;
    }
  }
`;

export const DealsSelectorGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

interface IDealPill {
  active?: boolean;
}

export const DealPill = styled.button<IDealPill>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ active }) => (active ? '#1f232e' : '#101217')};
  color: ${({ active }) => (active ? '#ffffff' : '#c0c6d4')};
  border: 1px solid ${({ active }) => (active ? '#eabf00' : '#232733')};
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  .tag {
    font-size: 0.65rem;
    font-weight: 900;
    color: #000;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  &:hover {
    border-color: #eabf00;
    transform: translateY(-1px);
  }
`;

export const ProductCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: #101217;
  border: 1px solid #232733;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    border-color: #eabf00;
    transform: translateY(-3px);
  }
`;

export const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: #0d0f14;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PriceDropBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff3b30;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
`;

export const MatchBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #10b981;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
`;

interface IWishBtn {
  active?: boolean;
}

export const WishButton = styled.button<IWishBtn>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(18, 20, 27, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ active }) => (active ? '#ff3b30' : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background: #ffffff;
    color: #ff3b30;
  }
`;

export const CardBody = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;

  .category {
    font-size: 0.68rem;
    color: #687082;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  h4 {
    margin: 0 0 8px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.3;
    height: 36px;
    overflow: hidden;
  }

  .prices {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 12px;

    .current {
      font-size: 1.1rem;
      font-weight: 900;
      color: #eabf00;
    }

    .original {
      font-size: 0.8rem;
      color: #687082;
      text-decoration: line-through;
    }
  }
`;

export const QuickAddButton = styled.button`
  background: #1a1d26;
  border: 1px solid #282c38;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: auto;
  transition: all 0.2s ease;

  &:hover {
    background: #eabf00;
    color: #000000;
    border-color: #eabf00;
  }
`;

export const PopularitySections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PopularGroup = styled.div`
  background: #0f1117;
  border: 1px solid #232733;
  border-radius: 14px;
  padding: 18px;

  h4 {
    margin: 0 0 14px;
    font-size: 0.95rem;
    font-weight: 800;
    color: #ffffff;
  }
`;

export const MiniList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MiniItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #14161d;
  border: 1px solid #1f232e;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  img {
    width: 48px;
    height: 58px;
    object-fit: cover;
    border-radius: 6px;
  }

  .info {
    display: flex;
    flex-direction: column;
    flex: 1;

    strong {
      font-size: 0.82rem;
      color: #ffffff;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 220px;
    }

    .sold {
      font-size: 0.68rem;
      color: #ff3b30;
      font-weight: 700;
    }

    .rating {
      font-size: 0.68rem;
      color: #eabf00;
      font-weight: 700;
    }

    .price {
      font-size: 0.82rem;
      font-weight: 800;
      color: #ffffff;
      margin-top: 2px;
    }
  }

  &:hover {
    border-color: #eabf00;
    transform: translateX(4px);
  }
`;

export const PersonalizedSubSection = styled.div`
  margin-bottom: 24px;

  h4 {
    margin: 0 0 12px;
    font-size: 1rem;
    font-weight: 800;
    color: #ffffff;
  }
`;

export const HorizontalScroll = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #282c38;
    border-radius: 3px;
  }
`;

export const RecentCard = styled.div`
  flex-shrink: 0;
  width: 130px;
  background: #101217;
  border: 1px solid #232733;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 6px;
  }

  .title {
    margin: 0 0 4px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 0.8rem;
    font-weight: 800;
    color: #eabf00;
  }

  &:hover {
    border-color: #eabf00;
  }
`;
