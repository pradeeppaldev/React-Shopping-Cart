import { useEffect } from 'react';

import Loader from 'components/Loader';
import { GithubCorner, GithubStarButton } from 'components/Github';
import Recruiter from 'components/Recruiter';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';
import Navbar from 'components/Navbar';
import Hero from 'components/Hero';
import SmartDiscovery from 'components/SmartDiscovery';
import HomepageSections from 'components/HomepageSections';
import ProductDetailsModal from 'components/ProductDetailsModal';
import WishlistDrawer from 'components/WishlistDrawer';
import FirstTimeBuyerBanner from 'components/FirstTimeBuyerBanner';
import SpinAndWinModal from 'components/SpinAndWinModal';
import RewardsDashboardModal from 'components/RewardsDashboardModal';
import NotificationsModal from 'components/NotificationsModal';
import UserProfileModal from 'components/UserProfileModal';
import CheckoutModal from 'components/CheckoutModal';
import Toaster from 'components/Toaster';
import Footer from 'components/Footer';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

function App() {
  const {
    isFetching,
    products,
    fetchProducts,
    categoryFilter,
    filters,
    searchQuery,
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Container>
      {isFetching && <Loader />}
      <GithubCorner />
      <Recruiter />

      {/* Modern Gen Z Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* First-Time Buyer Welcome Discount Offer */}
      <FirstTimeBuyerBanner />

      {/* Smart Discovery (Budget, Mood, Occasion, Deals & Timers, Price Drops, Popularity, Personalization) */}
      <SmartDiscovery />

      {/* Homepage Curated Highlights (Trending, Viral, Looks, New, Best Sellers, Most Loved, Most Purchased) */}
      <HomepageSections />

      {/* Main Catalog Discovery Section */}
      <S.CatalogSection id="catalog-section">
        <S.CatalogHeader>
          <S.CatalogTitle>
            FULL ARCHIVE DROP <span>{'// 2026'}</span>
          </S.CatalogTitle>
          <S.CatalogSubtitle>
            Filter by your favorite streetwear cuts, categories, sizes, or search directly.
          </S.CatalogSubtitle>
        </S.CatalogHeader>

        <S.TwoColumnGrid>
          <S.Side>
            <Filter />
            <GithubStarButton />
          </S.Side>
          <S.Main>
            <S.MainHeader>
              <p>
                <b>{products?.length}</b> Product(s) found
              </p>
              <S.ActiveBadgesWrapper>
                {categoryFilter !== 'All' && (
                  <S.ActiveBadge>Category: {categoryFilter}</S.ActiveBadge>
                )}
                {filters && filters.length > 0 && (
                  <S.ActiveBadge>Sizes: {filters.join(', ')}</S.ActiveBadge>
                )}
                {searchQuery && (
                  <S.ActiveBadge>Search: "{searchQuery}"</S.ActiveBadge>
                )}
              </S.ActiveBadgesWrapper>
            </S.MainHeader>
            <Products products={products} />
          </S.Main>
        </S.TwoColumnGrid>
      </S.CatalogSection>

      {/* Modals and Drawers */}
      <ProductDetailsModal />
      <WishlistDrawer />
      <SpinAndWinModal />
      <RewardsDashboardModal />
      <NotificationsModal />
      <UserProfileModal />
      <CheckoutModal />
      <Cart />

      {/* Global Interactive Feedback Toast System */}
      <Toaster />

      {/* Modern Brand Footer */}
      <Footer />
    </S.Container>
  );
}

export default App;
