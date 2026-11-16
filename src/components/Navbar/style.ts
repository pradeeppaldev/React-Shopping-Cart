import styled from 'styled-components/macro';

export const NavContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: rgba(14, 16, 21, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #232733;
  width: 100%;
`;

export const AnnouncementBar = styled.div`
  background: linear-gradient(90deg, #111317 0%, #1f232d 50%, #111317 100%);
  color: #ccff00;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  text-transform: uppercase;
  padding: 6px 0;
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 1px solid #282c38;
`;

export const TickerTrack = styled.div`
  display: inline-flex;
  gap: 24px;
  animation: marquee 25s linear infinite;

  span b {
    color: #fff;
    background: #eabf00;
    color: #000;
    padding: 1px 4px;
    border-radius: 2px;
  }
`;

export const MainHeader = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 12px 20px 6px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const LogoWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
`;

export const LogoBrand = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #ffffff;
  line-height: 1;

  span {
    color: #eabf00;
    font-style: italic;
  }
`;

export const LogoTagline = styled.span`
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #687082;
  margin-top: 2px;
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 520px;
  margin: 0 16px;

  @media (max-width: 768px) {
    order: 3;
    max-width: 100%;
    margin: 8px 0 4px;
    width: 100%;
  }
`;

export const SearchIcon = styled.svg`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #a0a6b5;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 36px 10px 40px;
  background-color: #1a1d26;
  border: 1px solid #282c38;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.85rem;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #687082;
    font-size: 0.82rem;
  }

  &:focus {
    border-color: #eabf00;
    background-color: #1f232e;
    box-shadow: 0 0 0 3px rgba(234, 191, 0, 0.15);
  }
`;

export const ClearSearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0a6b5;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffffff;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CoinsPill = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(234, 191, 0, 0.12);
  border: 1px solid rgba(234, 191, 0, 0.4);
  border-radius: 999px;
  padding: 7px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  .coin {
    font-size: 1rem;
  }

  .amount {
    font-size: 0.85rem;
    font-weight: 900;
    color: #eabf00;
  }

  &:hover {
    background: rgba(234, 191, 0, 0.22);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(234, 191, 0, 0.2);
  }
`;

export const SpinPill = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(204, 255, 0, 0.1);
  border: 1px solid rgba(204, 255, 0, 0.35);
  border-radius: 999px;
  padding: 7px 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  .wheel {
    font-size: 1rem;
  }

  .text {
    font-size: 0.75rem;
    font-weight: 900;
    color: #ccff00;
    letter-spacing: 0.05em;
  }

  &:hover {
    background: rgba(204, 255, 0, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(204, 255, 0, 0.25);
  }
`;

export const IconButton = styled.button`
  position: relative;
  background-color: #1a1d26;
  border: 1px solid #282c38;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #282c38;
    border-color: #eabf00;
    transform: translateY(-1px);
  }
`;

export const HeartIcon = styled.svg`
  width: 20px;
  height: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;

export const CartButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #1f232d 0%, #15181f 100%);
  border: 1px solid #2f3442;
  border-radius: 999px;
  padding: 6px 16px 6px 12px;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    border-color: #eabf00;
    box-shadow: 0 4px 12px rgba(234, 191, 0, 0.15);
    transform: translateY(-1px);
  }
`;

export const BagIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: #eabf00;
`;

export const CartTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const CartTitle = styled.span`
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #a0a6b5;
`;

export const CartAmount = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
`;

export const Badge = styled.span`
  background-color: #eabf00;
  color: #000000;
  font-size: 0.7rem;
  font-weight: 800;
  border-radius: 999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
`;

export const NotifBadge = styled(Badge)`
  background-color: #ff0055;
  color: #ffffff;
  position: absolute;
  top: -4px;
  right: -4px;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1a1d26;
  border: 1px solid #282c38;
  border-radius: 999px;
  padding: 4px 12px 4px 4px;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #00ff88;
  }

  .name {
    font-size: 0.8rem;
    font-weight: 700;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    border-color: #00ff88;
    background: #232838;
    transform: translateY(-1px);
  }

  @media (max-width: 900px) {
    .name {
      display: none;
    }
    padding: 3px;
  }
`;

export const CategoryNav = styled.nav`
  margin-top: 10px;
  border-top: 1px solid #1e222c;
  padding-top: 6px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CategoryList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface ICategoryItem {
  active?: boolean;
}

export const CategoryItem = styled.li<ICategoryItem>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#ffffff' : '#a0a6b5')};
  background-color: ${({ active }) => (active ? '#282c38' : 'transparent')};
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    background-color: #20242f;
  }
`;

export const HotTag = styled.span`
  font-size: 0.55rem;
  font-weight: 800;
  background: #ff3b30;
  color: #fff;
  padding: 1px 5px;
  border-radius: 4px;
  letter-spacing: 0.05em;
`;

export const NewTag = styled.span`
  font-size: 0.55rem;
  font-weight: 800;
  background: #ccff00;
  color: #000;
  padding: 1px 5px;
  border-radius: 4px;
  letter-spacing: 0.05em;
`;
