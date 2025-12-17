// src/components/FilterBar.jsx
import { stallCategories } from "../data/stalls";

function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  showCategory = true,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-input"
        placeholder="Rechercher un commerçant ou un produit..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {/*}
      {showCategory && (
        <select
          className="filter-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {stallCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      )}*/}
    </div>
  );
}

export default FilterBar;
