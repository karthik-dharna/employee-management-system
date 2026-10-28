function SearchBar({
  search,
  setSearch,
  departmentFilter,
  setDepartmentFilter
}) {
  return (
    <div className="search-container">

      <input
        className="search-box"
        type="text"
        placeholder="Search by name or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="department-filter"
        value={departmentFilter}
        onChange={(e) =>
          setDepartmentFilter(e.target.value)
        }
      >
        <option value="ALL">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
      </select>

      <button
        className="clear-button"
        type="button"
        onClick={() => {
          setSearch("");
          setDepartmentFilter("ALL");
        }}
      >
        Clear Filters
      </button>

    </div>
  );
}

export default SearchBar;