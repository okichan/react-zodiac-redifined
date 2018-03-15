import React from "react";

function SearchField({ searchImage, clearSearch }) {
  return (
    <div className="search-component">
      <form
        onSubmit={event => {
          event.preventDefault();
          const form = event.target;
          const elements = form.elements;
          const query = elements.query.value;
          searchImage(query);
        }}
      >
        <input type="number" id="search-field" placeholder="YYYY" name="query" />
        <button>Search</button>
        <p className="clickable clear" onClick={clearSearch}>
          Clear
        </p>
      </form>
    </div>
  );
}

export default SearchField;
