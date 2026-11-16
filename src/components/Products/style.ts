import styled from 'styled-components/macro';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media only screen and (min-width: 580px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const EmptyWrapper = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #14161d;
  border: 1px dashed #282c38;
  border-radius: 20px;
  margin: 20px 0;

  .search-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    display: inline-block;
  }

  h3 {
    margin: 0 0 8px;
    font-size: 1.3rem;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0 auto 24px;
    max-width: 420px;
    font-size: 0.9rem;
    color: #a0a6b5;
  }
`;

export const ResetButton = styled.button`
  background: #eabf00;
  color: #000000;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffdf5a;
    transform: translateY(-2px);
  }
`;
