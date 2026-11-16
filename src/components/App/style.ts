import styled from 'styled-components/macro';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #090a0d;
  color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const CatalogSection = styled.section`
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const CatalogHeader = styled.div`
  margin-bottom: 24px;
`;

export const CatalogTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;

  span {
    color: #eabf00;
  }
`;

export const CatalogSubtitle = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: #a0a6b5;
`;

export const TwoColumnGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1360px;
  width: 100%;
  margin: 20px auto 40px;
  gap: 32px;
  box-sizing: border-box;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    grid-template-columns: 280px 1fr;
  }

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.desktop}) {
    grid-template-columns: 300px 1fr;
  }
`;

export const Side = styled.div`
  box-sizing: border-box;

  @media only screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}) {
    position: sticky;
    top: 140px;
    align-self: start;
  }
`;

export const Main = styled.main`
  min-width: 0;
`;

export const MainHeader = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 12px 18px;
  background: #14161d;
  border: 1px solid #232733;
  border-radius: 12px;
  flex-wrap: wrap;
  gap: 12px;

  p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 700;
    color: #a0a6b5;

    b {
      color: #ffffff;
    }
  }
`;

export const ActiveBadgesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ActiveBadge = styled.span`
  background: #1f232e;
  border: 1px solid #282c38;
  color: #eabf00;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
