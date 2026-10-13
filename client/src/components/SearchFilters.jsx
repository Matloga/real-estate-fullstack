const SearchFilters = ({ filters, onChange, onSubmit }) => {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <form
      className="form"
      style={{ maxWidth: '100%' }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(filters);
      }}
    >
      <input placeholder="City" value={filters.city} onChange={set('city')} />
      <select value={filters.type} onChange={set('type')}>
        <option value="">Any type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="land">Land</option>
        <option value="commercial">Commercial</option>
      </select>
      <select value={filters.status} onChange={set('status')}>
        <option value="">Any status</option>
        <option value="for-sale">For sale</option>
        <option value="for-rent">For rent</option>
        <option value="sold">Sold</option>
      </select>
      <input type="number" placeholder="Min price" value={filters.minPrice} onChange={set('minPrice')} />
      <input type="number" placeholder="Max price" value={filters.maxPrice} onChange={set('maxPrice')} />
      <input placeholder="Keyword" value={filters.keyword} onChange={set('keyword')} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchFilters;
