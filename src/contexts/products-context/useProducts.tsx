import { useCallback } from 'react';
import { useProductsContext } from './ProductsContextProvider';
import { IProduct } from 'models';
import { getProducts } from 'services/products';

const useProducts = () => {
  const context = useProductsContext();
  const isFetching = context.isFetching;
  const setIsFetching = context.setIsFetching;
  const products = context.products || [];
  const setProducts = context.setProducts;
  const filters = context.filters || [];
  const setFilters = context.setFilters;
  const allProducts = context.allProducts || [];
  const setAllProducts = context.setAllProducts || (() => {});
  const categoryFilter = context.categoryFilter || 'All';
  const setCategoryFilter = context.setCategoryFilter || (() => {});
  const searchQuery = context.searchQuery || '';
  const setSearchQuery = context.setSearchQuery || (() => {});
  const sortBy = context.sortBy || 'featured';
  const setSortBy = context.setSortBy || (() => {});
  const freeShippingOnly = context.freeShippingOnly || false;
  const setFreeShippingOnly = context.setFreeShippingOnly || (() => {});

  // Smart Discovery Filters
  const budgetFilter = context.budgetFilter || 'all';
  const setBudgetFilter = context.setBudgetFilter || (() => {});
  const customMinPrice = context.customMinPrice || '';
  const setCustomMinPrice = context.setCustomMinPrice || (() => {});
  const customMaxPrice = context.customMaxPrice || '';
  const setCustomMaxPrice = context.setCustomMaxPrice || (() => {});
  const moodFilter = context.moodFilter || 'All';
  const setMoodFilter = context.setMoodFilter || (() => {});
  const occasionFilter = context.occasionFilter || 'All';
  const setOccasionFilter = context.setOccasionFilter || (() => {});
  const dealFilter = context.dealFilter || 'All';
  const setDealFilter = context.setDealFilter || (() => {});
  const activeDiscoveryView = context.activeDiscoveryView || 'all';
  const setActiveDiscoveryView = context.setActiveDiscoveryView || (() => {});

  const selectedProductForDetail = context.selectedProductForDetail || null;
  const setSelectedProductForDetailRaw =
    context.setSelectedProductForDetail || (() => {});
  const recentlyViewed = context.recentlyViewed || [];
  const addRecentlyViewed = context.addRecentlyViewed || (() => {});

  const setSelectedProductForDetail = useCallback(
    (prod: IProduct | null) => {
      setSelectedProductForDetailRaw(prod);
      if (prod) {
        addRecentlyViewed(prod);
      }
    },
    [addRecentlyViewed, setSelectedProductForDetailRaw]
  );

  const applyFilteringAndSorting = useCallback(
    (
      sourceProducts: IProduct[],
      activeSizes: string[],
      cat: string,
      search: string,
      budget: string,
      minP: string,
      maxP: string,
      mood: string,
      occasion: string,
      deal: string,
      shippingOnly: boolean,
      sort: string
    ) => {
      let result = [...(sourceProducts || [])];

      // 1. Size filtering
      if (activeSizes && activeSizes.length > 0) {
        result = result.filter((p: IProduct) =>
          activeSizes.some((filter: string) =>
            p.availableSizes?.some((size: string) => size === filter)
          )
        );
      }

      // 2. Category filtering
      if (cat && cat !== 'All') {
        result = result.filter(
          (p: IProduct) =>
            p.category?.toLowerCase() === cat.toLowerCase()
        );
      }

      // 3. Search query filtering
      if (search && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        result = result.filter((p: IProduct) => {
          const matchTitle = p.title?.toLowerCase().includes(query);
          const matchDesc = p.description?.toLowerCase().includes(query);
          const matchStyle = p.style?.toLowerCase().includes(query);
          const matchCategory = p.category?.toLowerCase().includes(query);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(query));
          const matchMood = p.moods?.some((m) => m.toLowerCase().includes(query));
          const matchOccasion = p.occasions?.some((o) => o.toLowerCase().includes(query));
          return (
            matchTitle ||
            matchDesc ||
            matchStyle ||
            matchCategory ||
            matchTags ||
            matchMood ||
            matchOccasion
          );
        });
      }

      // 4. Shop by Budget Filter
      if (budget === 'under-299') {
        result = result.filter((p) => p.price <= 299);
      } else if (budget === 'under-499') {
        result = result.filter((p) => p.price <= 499);
      } else if (budget === 'under-999') {
        result = result.filter((p) => p.price <= 999);
      } else if (budget === 'under-1499') {
        result = result.filter((p) => p.price <= 1499);
      } else if (budget === 'premium') {
        result = result.filter((p) => p.price >= 1500);
      }

      // Custom Min and Max Price Filter
      if (minP !== '' && !isNaN(Number(minP))) {
        result = result.filter((p) => p.price >= Number(minP));
      }
      if (maxP !== '' && !isNaN(Number(maxP))) {
        result = result.filter((p) => p.price <= Number(maxP));
      }

      // 5. Shop by Mood Filter
      if (mood && mood !== 'All') {
        result = result.filter(
          (p) => p.moods && p.moods.some((m) => m.toLowerCase() === mood.toLowerCase())
        );
      }

      // 6. Shop by Occasion Filter
      if (occasion && occasion !== 'All') {
        result = result.filter(
          (p) =>
            p.occasions &&
            p.occasions.some((o) => o.toLowerCase() === occasion.toLowerCase())
        );
      }

      // 7. Offers & Deals Filter
      if (deal && deal !== 'All') {
        result = result.filter(
          (p) =>
            p.dealTypes &&
            p.dealTypes.some((d) => d.toLowerCase() === deal.toLowerCase())
        );
      }

      // 8. Free shipping only
      if (shippingOnly) {
        result = result.filter((p) => p.isFreeShipping);
      }

      // 9. Sorting
      if (sort === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sort === 'newest') {
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      } else if (sort === 'purchases') {
        result.sort(
          (a, b) =>
            (b.purchaseCountThisWeek || 0) - (a.purchaseCountThisWeek || 0)
        );
      }

      return result;
    },
    []
  );

  const fetchProducts = useCallback(() => {
    setIsFetching(true);
    getProducts().then((fetched: IProduct[]) => {
      setIsFetching(false);
      setAllProducts(fetched);
      setProducts(fetched);
    });
  }, [setIsFetching, setAllProducts, setProducts]);

  const filterProducts = useCallback(
    (newFilters: string[]) => {
      setIsFetching(true);
      getProducts().then((fetched: IProduct[]) => {
        setIsFetching(false);
        setFilters(newFilters);
        const source = allProducts.length > 0 ? allProducts : fetched;
        if (allProducts.length === 0) {
          setAllProducts(fetched);
        }

        const filtered = applyFilteringAndSorting(
          source,
          newFilters,
          categoryFilter,
          searchQuery,
          budgetFilter,
          customMinPrice,
          customMaxPrice,
          moodFilter,
          occasionFilter,
          dealFilter,
          freeShippingOnly,
          sortBy
        );
        setProducts(filtered);
      });
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      searchQuery,
      setAllProducts,
      setFilters,
      setIsFetching,
      setProducts,
      sortBy,
    ]
  );

  const updateCategoryFilter = useCallback(
    (cat: string) => {
      setCategoryFilter(cat);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        cat,
        searchQuery,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasionFilter,
        dealFilter,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      searchQuery,
      setCategoryFilter,
      setProducts,
      sortBy,
    ]
  );

  const updateSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        query,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasionFilter,
        dealFilter,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      setProducts,
      setSearchQuery,
      sortBy,
    ]
  );

  const updateSortBy = useCallback(
    (newSort: string) => {
      setSortBy(newSort);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasionFilter,
        dealFilter,
        freeShippingOnly,
        newSort
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      searchQuery,
      setProducts,
      setSortBy,
    ]
  );

  const updateBudgetFilter = useCallback(
    (range: string) => {
      setBudgetFilter(range);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        range,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasionFilter,
        dealFilter,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      searchQuery,
      setBudgetFilter,
      setProducts,
      sortBy,
    ]
  );

  const updateCustomPriceRange = useCallback(
    (minP: string, maxP: string) => {
      setCustomMinPrice(minP);
      setCustomMaxPrice(maxP);
      setBudgetFilter('custom');
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        'custom',
        minP,
        maxP,
        moodFilter,
        occasionFilter,
        dealFilter,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      categoryFilter,
      dealFilter,
      filters,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      searchQuery,
      setBudgetFilter,
      setCustomMaxPrice,
      setCustomMinPrice,
      setProducts,
      sortBy,
    ]
  );

  const updateMoodFilter = useCallback(
    (mood: string) => {
      setMoodFilter(mood);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        mood,
        occasionFilter,
        dealFilter,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      freeShippingOnly,
      occasionFilter,
      searchQuery,
      setMoodFilter,
      setProducts,
      sortBy,
    ]
  );

  const updateOccasionFilter = useCallback(
    (occasion: string) => {
      setOccasionFilter(occasion);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasion,
        dealFilter,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      freeShippingOnly,
      moodFilter,
      searchQuery,
      setOccasionFilter,
      setProducts,
      sortBy,
    ]
  );

  const updateDealFilter = useCallback(
    (deal: string) => {
      setDealFilter(deal);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasionFilter,
        deal,
        freeShippingOnly,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      filters,
      freeShippingOnly,
      moodFilter,
      occasionFilter,
      searchQuery,
      setDealFilter,
      setProducts,
      sortBy,
    ]
  );

  const updateFreeShippingOnly = useCallback(
    (val: boolean) => {
      setFreeShippingOnly(val);
      const filtered = applyFilteringAndSorting(
        allProducts,
        filters,
        categoryFilter,
        searchQuery,
        budgetFilter,
        customMinPrice,
        customMaxPrice,
        moodFilter,
        occasionFilter,
        dealFilter,
        val,
        sortBy
      );
      setProducts(filtered);
    },
    [
      allProducts,
      applyFilteringAndSorting,
      budgetFilter,
      categoryFilter,
      customMaxPrice,
      customMinPrice,
      dealFilter,
      filters,
      moodFilter,
      occasionFilter,
      searchQuery,
      setFreeShippingOnly,
      setProducts,
      sortBy,
    ]
  );

  const resetAllFilters = useCallback(() => {
    setFilters([]);
    setCategoryFilter('All');
    setSearchQuery('');
    setSortBy('featured');
    setBudgetFilter('all');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setMoodFilter('All');
    setOccasionFilter('All');
    setDealFilter('All');
    setFreeShippingOnly(false);
    setActiveDiscoveryView('all');
    setProducts(allProducts);
  }, [
    allProducts,
    setActiveDiscoveryView,
    setBudgetFilter,
    setCategoryFilter,
    setCustomMaxPrice,
    setCustomMinPrice,
    setDealFilter,
    setFilters,
    setFreeShippingOnly,
    setMoodFilter,
    setOccasionFilter,
    setProducts,
    setSearchQuery,
    setSortBy,
  ]);

  // Section collections
  const pool = allProducts.length > 0 ? allProducts : products;

  // Homepage curated sections
  const trendingProducts = pool.filter((p) => p.isTrending);
  const viralProducts = pool.filter((p) => p.isViral);
  const stylishLooks = pool.filter((p) => p.isStylishLook);
  const newArrivals = pool.filter((p) => p.isNewArrival);
  const mostLoved = pool.filter((p) => p.isMostLoved);
  const mostPurchased = pool.filter(
    (p) => p.isMostPurchased || (p.purchaseCountThisWeek || 0) > 500
  );

  // Price Drop section
  const priceDropProducts = pool.filter(
    (p) => p.isPriceDrop || (p.originalPrice && p.originalPrice > p.price)
  );

  // Popularity sections
  const mostPurchasedThisWeek = [...pool].sort(
    (a, b) => (b.purchaseCountThisWeek || 0) - (a.purchaseCountThisWeek || 0)
  );
  const bestSellers = pool.filter((p) => p.isBestSeller);
  const trendingAmongCustomers = pool.filter(
    (p) => p.isTrendingAmongCustomers || p.isTrending
  );
  const communityFavorites = pool.filter(
    (p) => p.isCommunityFavorite || p.isMostLoved
  );

  // Offers & Deals collections
  const todaysDeals = pool.filter(
    (p) => p.dealTypes && p.dealTypes.includes("Today's Deals")
  );
  const exclusiveOffers = pool.filter(
    (p) => p.dealTypes && p.dealTypes.includes('Exclusive Offers')
  );
  const comboOffers = pool.filter(
    (p) => p.dealTypes && p.dealTypes.includes('Combo Offers')
  );
  const limitedTimeDeals = pool.filter(
    (p) => p.dealTypes && p.dealTypes.includes('Limited-Time Deals')
  );
  const firstTimeBuyerDiscounts = pool.filter(
    (p) => p.dealTypes && p.dealTypes.includes('First-Time Buyer Discounts')
  );

  // Personalization collections
  const recommendedForYou = pool
    .filter((p) => (p.rating || 0) >= 4.8 || p.isTrending)
    .slice(0, 6);

  const personalizedDeals = pool
    .filter((p) => p.originalPrice && p.originalPrice - p.price >= 300)
    .slice(0, 4);

  const getSimilarProducts = (product: IProduct) => {
    return pool
      .filter(
        (p) =>
          p.sku !== product.sku &&
          (p.category === product.category ||
            p.moods?.some((m) => product.moods?.includes(m)))
      )
      .slice(0, 4);
  };

  return {
    isFetching,
    fetchProducts,
    products,
    filterProducts,
    filters,
    allProducts,
    categoryFilter,
    updateCategoryFilter,
    searchQuery,
    updateSearchQuery,
    sortBy,
    updateSortBy,
    freeShippingOnly,
    updateFreeShippingOnly,
    resetAllFilters,

    // Budget
    budgetFilter,
    updateBudgetFilter,
    priceFilter: budgetFilter,
    updatePriceFilter: updateBudgetFilter,
    customMinPrice,
    customMaxPrice,
    updateCustomPriceRange,

    // Mood & Occasion
    moodFilter,
    updateMoodFilter,
    occasionFilter,
    updateOccasionFilter,

    // Deals
    dealFilter,
    updateDealFilter,

    // Discovery Tab
    activeDiscoveryView,
    setActiveDiscoveryView,

    // Modals & Personalization
    selectedProductForDetail,
    setSelectedProductForDetail,
    recentlyViewed,
    recommendedForYou,
    personalizedDeals,
    getSimilarProducts,

    // Curated groups
    trendingProducts,
    viralProducts,
    stylishLooks,
    newArrivals,
    bestSellers,
    mostLoved,
    mostPurchased,
    priceDropProducts,
    mostPurchasedThisWeek,
    trendingAmongCustomers,
    communityFavorites,
    todaysDeals,
    exclusiveOffers,
    comboOffers,
    limitedTimeDeals,
    firstTimeBuyerDiscounts,
  };
};

export default useProducts;
