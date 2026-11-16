import { useProducts } from 'contexts/products-context';
import * as S from './style';

export const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

export const categories = [
  'All',
  'Streetwear',
  'Men\'s Fashion',
  'Women\'s Fashion',
  'Footwear',
  'Accessories',
];

const Filter = () => {
  const {
    filters,
    filterProducts,
    categoryFilter,
    updateCategoryFilter,
    sortBy,
    updateSortBy,
    budgetFilter,
    updateBudgetFilter,
    freeShippingOnly,
    updateFreeShippingOnly,
    resetAllFilters,
  } = useProducts();

  const selectedCheckboxes = new Set(filters);

  const toggleCheckbox = (label: string) => {
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const newFilters = Array.from(selectedCheckboxes) as [];
    filterProducts(newFilters);
  };

  const createCheckbox = (label: string) => (
    <S.Checkbox label={label} handleOnChange={toggleCheckbox} key={label} />
  );

  const createCheckboxes = () => availableSizes.map(createCheckbox);

  const activeFilterCount =
    filters.length +
    (categoryFilter !== 'All' ? 1 : 0) +
    (budgetFilter !== 'all' ? 1 : 0) +
    (freeShippingOnly ? 1 : 0);

  return (
    <S.Container>
      <S.FilterHeader>
        <S.MainFilterTitle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>FILTERS</span>
          {activeFilterCount > 0 && <S.CountBadge>{activeFilterCount}</S.CountBadge>}
        </S.MainFilterTitle>
        {activeFilterCount > 0 && (
          <S.ResetLink onClick={resetAllFilters}>Reset All</S.ResetLink>
        )}
      </S.FilterHeader>

      {/* Sort By Filter */}
      <S.Section>
        <S.Title>Sort By:</S.Title>
        <S.SortSelect
          value={sortBy}
          onChange={(e) => updateSortBy(e.target.value)}
        >
          <option value="featured">🔥 Featured Drops</option>
          <option value="price-asc">⚡ Price: Low to High</option>
          <option value="price-desc">💎 Price: High to Low</option>
          <option value="rating">⭐ Highest Rated</option>
          <option value="newest">✨ New Arrivals</option>
        </S.SortSelect>
      </S.Section>

      {/* Category Filter */}
      <S.Section>
        <S.Title>Category:</S.Title>
        <S.CategoryPills>
          {categories.map((cat) => (
            <S.CategoryPill
              key={cat}
              active={categoryFilter.toLowerCase() === cat.toLowerCase()}
              onClick={() => updateCategoryFilter(cat)}
            >
              {cat}
            </S.CategoryPill>
          ))}
        </S.CategoryPills>
      </S.Section>

      {/* Sizes Filter */}
      <S.Section>
        <S.Title>Sizes:</S.Title>
        <S.SizesGrid>{createCheckboxes()}</S.SizesGrid>
      </S.Section>

      {/* Price Range */}
      <S.Section>
        <S.Title>Budget Range:</S.Title>
        <S.PriceRangeGroup>
          <S.PriceOption
            active={budgetFilter === 'all'}
            onClick={() => updateBudgetFilter('all')}
          >
            All Budgets
          </S.PriceOption>
          <S.PriceOption
            active={budgetFilter === 'under-299'}
            onClick={() => updateBudgetFilter('under-299')}
          >
            Under ₹299
          </S.PriceOption>
          <S.PriceOption
            active={budgetFilter === 'under-499'}
            onClick={() => updateBudgetFilter('under-499')}
          >
            Under ₹499
          </S.PriceOption>
          <S.PriceOption
            active={budgetFilter === 'under-999'}
            onClick={() => updateBudgetFilter('under-999')}
          >
            Under ₹999
          </S.PriceOption>
          <S.PriceOption
            active={budgetFilter === 'under-1499'}
            onClick={() => updateBudgetFilter('under-1499')}
          >
            Under ₹1499
          </S.PriceOption>
          <S.PriceOption
            active={budgetFilter === 'premium'}
            onClick={() => updateBudgetFilter('premium')}
          >
            Premium (₹1500+)
          </S.PriceOption>
        </S.PriceRangeGroup>
      </S.Section>

      {/* Free Shipping Toggle */}
      <S.Section>
        <S.ShippingToggleLabel>
          <input
            type="checkbox"
            checked={freeShippingOnly}
            onChange={(e) => updateFreeShippingOnly(e.target.checked)}
          />
          <span>Free Express Shipping Only</span>
        </S.ShippingToggleLabel>
      </S.Section>
    </S.Container>
  );
};

export default Filter;
