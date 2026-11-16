import styled from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 14px;
  background: #101217;
  border: 1px solid #232733;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2e3442;
  }
`;

export const Image = styled.img`
  width: 60px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #1a1d26;
  flex-shrink: 0;
`;

export const Details = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.p`
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  margin: 0 0 4px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 18px;
`;

export const Desc = styled.p`
  color: #a0a6b5;
  font-size: 0.72rem;
  margin: 0;
  display: flex;
  gap: 8px;

  .qty {
    color: #687082;
  }
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;

  p {
    margin: 0;
    color: #eabf00;
    font-size: 0.95rem;
    font-weight: 800;
  }

  div {
    display: flex;
    align-items: center;
    background: #1a1d26;
    border: 1px solid #282c38;
    border-radius: 6px;
    overflow: hidden;
  }
`;

export const QuantityValue = styled.span`
  padding: 0 6px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #ffffff;
  min-width: 14px;
  text-align: center;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #687082;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  border-radius: 4px;
  transition: all 0.15s ease;

  &:hover {
    color: #ff3b30;
    background: rgba(255, 59, 48, 0.1);
  }
`;

export const ChangeQuantity = styled.button`
  color: #ffffff;
  border: 0;
  background-color: transparent;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: background-color 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #282c38;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
