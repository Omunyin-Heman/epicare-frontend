import React from "react";

const DashboardToolbar = ({
  search,
  setSearch,
  filter,
  setFilter,
  filterOptions = [],
  filterLabel = "",
  onDownload,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  sortOptions = [],
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded-md w-full md:w-1/3"
      />

      {/* 🛠 Filter + Sort + Download */}
      <div className="flex flex-wrap gap-2 items-center">
        
        {/* Filter */}
        {filterOptions.length > 0 && (
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">{filterLabel}</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border px-4 py-2 rounded-md"
            >
              <option value="All">All</option>
              {filterOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        {sortOptions.length > 0 && (
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Sort By</label>
            <div className="flex gap-2">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="border px-4 py-2 rounded-md"
              >
                <option value="">None</option>
                {sortOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border px-4 py-2 rounded-md"
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
        )}

        {/* Download CSV */}
        {onDownload && (
          <button
            onClick={onDownload}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            ⬇ Download CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardToolbar;
