import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

/* Theme */
import { ThemeProvider } from 'commons/style/styled-components';
import { theme } from 'commons/style/theme';
import GlobalStyle from 'commons/style/global-style';

/* Context Providers */
import { ProductsProvider } from 'contexts/products-context';
import { CartProvider } from 'contexts/cart-context';
import { WishlistProvider } from 'contexts/wishlist-context';
import { GamificationProvider } from 'contexts/gamification-context';
import { UserProvider } from 'contexts/user-context';
import ErrorBoundary from 'components/ErrorBoundary';

import App from 'components/App';

const root = document.getElementById('root')!;
const container = ReactDOMClient.createRoot(root);

container.render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ProductsProvider>
          <WishlistProvider>
            <CartProvider>
              <GamificationProvider>
                <UserProvider>
                  <App />
                </UserProvider>
              </GamificationProvider>
            </CartProvider>
          </WishlistProvider>
        </ProductsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
