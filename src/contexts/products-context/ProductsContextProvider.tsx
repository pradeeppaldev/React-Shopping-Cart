import { createContext, useContext, FC, useState, useEffect } from 'react';
import { IProduct } from 'models';

export interface IProductsContext {
  isFetching: boolean;
  setIsFetching(state: boolean): void;
  products: IProduct[];
  setProducts(products: IProduct[]): void;
  filters: string[];
  setFilters(filters: string[]): void;
  allProducts: IProduct[];
  setAllProducts(products: IProduct[]): void;

  // Navigation & Category
  categoryFilter: string;
  setCategoryFilter(category: string): void;
  searchQuery: string;
  setSearchQuery(query: string): void;
  sortBy: string;
  setSortBy(sort: string): void;
  freeShippingOnly: boolean;
  setFreeShippingOnly(val: boolean): void;

  // Shop by Budget
  budgetFilter: string;
  setBudgetFilter(range: string): void;
  customMinPrice: string;
  setCustomMinPrice(val: string): void;
  customMaxPrice: string;
  setCustomMaxPrice(val: string): void;

  // Shop by Mood & Occasion
  moodFilter: string;
  setMoodFilter(mood: string): void;
  occasionFilter: string;
  setOccasionFilter(occasion: string): void;

  // Offers & Deals
  dealFilter: string;
  setDealFilter(deal: string): void;

  // Details Modal
  selectedProductForDetail: IProduct | null;
  setSelectedProductForDetail(product: IProduct | null): void;

  // Personalization
  recentlyViewed: IProduct[];
  addRecentlyViewed(product: IProduct): void;

  // Active Discovery Navigation
  activeDiscoveryView: string;
  setActiveDiscoveryView(view: string): void;
}

const defaultProductsContext: IProductsContext = {
  isFetching: false,
  setIsFetching: () => {},
  products: [],
  setProducts: () => {},
  filters: [],
  setFilters: () => {},
  allProducts: [],
  setAllProducts: () => {},
  categoryFilter: 'All',
  setCategoryFilter: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  sortBy: 'featured',
  setSortBy: () => {},
  freeShippingOnly: false,
  setFreeShippingOnly: () => {},
  budgetFilter: 'all',
  setBudgetFilter: () => {},
  customMinPrice: '',
  setCustomMinPrice: () => {},
  customMaxPrice: '',
  setCustomMaxPrice: () => {},
  moodFilter: 'All',
  setMoodFilter: () => {},
  occasionFilter: 'All',
  setOccasionFilter: () => {},
  dealFilter: 'All',
  setDealFilter: () => {},
  selectedProductForDetail: null,
  setSelectedProductForDetail: () => {},
  recentlyViewed: [],
  addRecentlyViewed: () => {},
  activeDiscoveryView: 'all',
  setActiveDiscoveryView: () => {},
};

const ProductsContext = createContext<IProductsContext>(defaultProductsContext);

const useProductsContext = (): IProductsContext => {
  const context = useContext(ProductsContext);
  return context || defaultProductsContext;
};

const ProductsProvider: FC = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [freeShippingOnly, setFreeShippingOnly] = useState<boolean>(false);

  // Budget
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const [customMinPrice, setCustomMinPrice] = useState<string>('');
  const [customMaxPrice, setCustomMaxPrice] = useState<string>('');

  // Mood & Occasion
  const [moodFilter, setMoodFilter] = useState<string>('All');
  const [occasionFilter, setOccasionFilter] = useState<string>('All');

  // Deals
  const [dealFilter, setDealFilter] = useState<string>('All');

  // Discovery Navigation
  const [activeDiscoveryView, setActiveDiscoveryView] = useState<string>('all');

  // Modal
  const [selectedProductForDetail, setSelectedProductForDetail] =
    useState<IProduct | null>(null);

  // Recently Viewed (LocalStorage persisted)
  const [recentlyViewed, setRecentlyViewed] = useState<IProduct[]>(() => {
    try {
      const saved = localStorage.getItem('vibe_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vibe_recently_viewed', JSON.stringify(recentlyViewed));
    } catch {
      // storage unavailable
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (product: IProduct) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.sku !== product.sku);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const ProductContextValue: IProductsContext = {
    isFetching,
    setIsFetching,
    products,
    setProducts,
    filters,
    setFilters,
    allProducts,
    setAllProducts,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    freeShippingOnly,
    setFreeShippingOnly,
    budgetFilter,
    setBudgetFilter,
    customMinPrice,
    setCustomMinPrice,
    customMaxPrice,
    setCustomMaxPrice,
    moodFilter,
    setMoodFilter,
    occasionFilter,
    setOccasionFilter,
    dealFilter,
    setDealFilter,
    activeDiscoveryView,
    setActiveDiscoveryView,
    selectedProductForDetail,
    setSelectedProductForDetail,
    recentlyViewed,
    addRecentlyViewed,
  };

  return <ProductsContext.Provider value={ProductContextValue} {...props} />;
};

export { ProductsProvider, useProductsContext };
